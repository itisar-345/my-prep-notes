import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, BookOpen, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPdf: (title: string, fileName: string) => void;
}

export function SearchDialog({ isOpen, onClose, onSelectPdf }: SearchDialogProps) {
  const navigate = useNavigate();
  const { query, setQuery, results } = useSearch();

  const handleSelect = (result: typeof results[0]) => {
    if (result.resourceType === "pdf" && result.fileName) {
      onSelectPdf(result.title, result.fileName);
    } else if (result.url) {
      window.open(result.url, "_blank");
    }
    setQuery("");
    onClose();
  };

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl p-0 gap-0">
        <DialogHeader className="px-4 py-3 border-b border-border">
          <DialogTitle className="sr-only">Search Notes</DialogTitle>
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, notes, subjects..."
              className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto text-base"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 hover:bg-secondary rounded"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <div className="text-4xl mb-3">🔍</div>
              <p>No results found for "{query}"</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left",
                    "hover:bg-secondary transition-colors"
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent">
                    {result.type === "fundamental" ? (
                      <FileText className="h-5 w-5" />
                    ) : (
                      <BookOpen className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {result.title}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {result.type === "fundamental" ? "Computer Fundamentals" : "System Design"} • {result.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-8 text-center text-muted-foreground">
              <div className="text-4xl mb-3">✏️</div>
              <p>Start typing to search handwritten notes</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
