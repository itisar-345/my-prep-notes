import { useState, useEffect } from "react";

const STORAGE_KEY = "prepnotes-progress";

export function useProgress() {
  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedItems));
  }, [completedItems]);

  const toggleComplete = (id: string) => {
    setCompletedItems((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const isCompleted = (id: string) => completedItems.includes(id);

  const getProgress = (totalItems: number) => {
    if (totalItems === 0) return 0;
    return Math.round((completedItems.length / totalItems) * 100);
  };

  return { completedItems, toggleComplete, isCompleted, getProgress };
}
