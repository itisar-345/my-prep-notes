import { useMemo, useState } from "react";
import { subjects, systemDesignResources, codingResources, interviewResources } from "@/data/subjects";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  fileName?: string;
  url?: string;
  type: "fundamental" | "system-design" | "coding" | "interview";
  resourceType: "pdf" | "link";
}

export function useSearch() {
  const [query, setQuery] = useState("");

  const allItems = useMemo(() => {
    const items: SearchResult[] = [];

    // Add all fundamental subjects (each is 1 PDF)
    subjects.forEach((subject) => {
      items.push({
        id: subject.id,
        title: subject.name,
        description: subject.description,
        fileName: subject.fileName,
        type: "fundamental",
        resourceType: "pdf",
      });
    });

    // Add all system design resources
    systemDesignResources.forEach((resource) => {
      items.push({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        fileName: resource.fileName,
        url: resource.url,
        type: "system-design",
        resourceType: resource.type,
      });
    });

    // Add all coding resources
    codingResources.forEach((resource) => {
      items.push({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        url: resource.url,
        type: "coding",
        resourceType: "link",
      });
    });

    // Add all interview resources
    interviewResources.forEach((resource) => {
      items.push({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        fileName: resource.fileName,
        url: resource.url,
        type: "interview",
        resourceType: resource.type,
      });
    });

    return items;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
  }, [query, allItems]);

  return { query, setQuery, results, allItems };
}
