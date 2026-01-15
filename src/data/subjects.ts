import { Puzzle, BookOpen, Database, Calculator, Network, Monitor, Coffee, Globe, Cloud, RefreshCw, Youtube, Container, Code2, LucideIcon } from "lucide-react";

export interface SubjectPdf {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  fileName: string;
  color: string;
}

export const subjects: SubjectPdf[] = [
  {
    id: "os",
    name: "Operating Systems",
    shortName: "OS",
    description: "Process management, memory, scheduling, and more",
    icon: Monitor,
    fileName: "operating system.pdf",
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    id: "dbms",
    name: "Database Management Systems",
    shortName: "DBMS",
    description: "SQL, normalization, transactions, and indexing",
    icon: Database,
    fileName: "database management system.pdf",
    color: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    id: "oops",
    name: "Object-Oriented Programming",
    shortName: "OOPs",
    description: "Java-focused OOP concepts in depth",
    icon: Coffee,
    fileName: "object oriented programming.pdf",
    color: "from-orange-500/10 to-orange-600/5",
  },
  {
    id: "cn",
    name: "Computer Networks",
    shortName: "CN",
    description: "OSI model, TCP/IP, protocols, and security",
    icon: Globe,
    fileName: "computer network.pdf",
    color: "from-purple-500/10 to-purple-600/5",
  },
  {
    id: "cc",
    name: "Cloud Computing",
    shortName: "CC",
    description: "Cloud models, services, and virtualization",
    icon: Cloud,
    fileName: "cloud computing.pdf",
    color: "from-sky-500/10 to-sky-600/5",
  },
  {
    id: "sdlc",
    name: "Software Development Life Cycle",
    shortName: "SDLC",
    description: "Development methodologies and processes",
    icon: RefreshCw,
    fileName: "software life cycle.pdf",
    color: "from-pink-500/10 to-pink-600/5",
  },
  {
    id: "devops",
    name: "DevOps",
    shortName: "DevOps",
    description: "CI/CD, Docker, Kubernetes, and automation",
    icon: Container,
    fileName: "devops.pdf",
    color: "from-cyan-500/10 to-cyan-600/5",
  },
];

export interface SystemDesignResource {
  id: string;
  title: string;
  description: string;
  fileName?: string;
  url?: string;
  type: "pdf" | "link";
  category: "theory" | "examples";
}

export const systemDesignResources: SystemDesignResource[] = [
  {
    id: "sd-theory",
    title: "System Design Theory",
    description: "Scalability, load balancing, caching, databases, and architecture patterns",
    fileName: "system design.pdf",
    type: "pdf",
    category: "theory",
  },
  {
    id: "sd-examples-playlist",
    title: "System Design Playlist",
    description: "Video explanations of real-world system designs",
    url: "https://www.youtube.com/playlist?list=PLd_WlMSX7P1WFePSwmslYYqa2GGIDYTuL&si=5rmnv2VV-Kpfqdrm",
    type: "link",
    category: "examples",
  },
];

export interface CodingResource {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: LucideIcon;
}

export const codingResources: CodingResource[] = [
  {
    id: "dsa-leetcode",
    title: "DSA – LeetCode Quest",
    description: "Structured DSA learning path by LeetCode",
    url: "https://leetcode.com/quest/data-structures-and-algorithms-quest/",
    icon: Puzzle,
  },
  {
    id: "dsa-neetcode",
    title: "DSA – NeetCode Roadmap",
    description: "Curated DSA roadmap with patterns & explanations",
    url: "https://neetcode.io/roadmap",
    icon: BookOpen,
  },
  {
    id: "sql",
    title: "SQL – LeetCode Database Quest",
    description: "SQL problems focused on real interview patterns",
    url: "https://leetcode.com/quest/database-quest/",
    icon: Database,
  },
  {
    id: "maths",
    title: "Maths – LeetCode Maths Quest",
    description: "Math foundations required for coding interviews",
    url: "https://leetcode.com/quest/maths-quest/",
    icon: Calculator,
  },
  {
    id: "oops-java",
    title: "OOPs in Java – Real World Systems",
    description: "Java implementations of OOP concepts using real-world systems",
    url: "https://github.com/itisar-345/Notes/tree/main/OOPS",
    icon: Code2,
  },
  {
    id: "system-design",
    title: "System Design – LeetCode Quest",
    description: "System & software design fundamentals",
    url: "https://leetcode.com/quest/system-and-software-design-quest/",
    icon: Network,
  },
];

export interface InterviewResource {
  id: string;
  title: string;
  description: string;
  fileName?: string;
  url?: string;
  type: "pdf" | "link";
}

export const interviewResources: InterviewResource[] = [
  {
    id: "interview-notes",
    title: "Interview Prep Notes",
    description: "Q&A covering Java, OOP concepts, DBMS, and system design definitions",
    fileName: "interview prep.pdf",
    type: "pdf",
  },
  {
    id: "interview-playlist",
    title: "Interview Prep Playlist",
    description: "Curated YouTube playlist for interview preparation",
    url: "youtube.com/playlist?list=PLd_WlMSX7P1USfcEfkR649GF1AMx5pMjt&si=1DSH5J0h295QDjmj",
    type: "link",
  },
];