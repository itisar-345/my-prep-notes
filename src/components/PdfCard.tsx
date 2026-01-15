import { cn } from "@/lib/utils";
import { FileText, Eye, Bookmark, CheckCircle2, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PdfCardProps {
  id: string;
  title: string;
  description: string;
  fileName: string;
  icon?: LucideIcon;
  onPreview: () => void;
  index?: number;
  isBookmarked?: boolean;
  isCompleted?: boolean;
  onToggleBookmark?: () => void;
  onToggleComplete?: () => void;
}

export function PdfCard({
  id,
  title,
  description,
  fileName,
  icon: IconComponent,
  onPreview,
  index = 0,
  isBookmarked = false,
  isCompleted = false,
  onToggleBookmark,
  onToggleComplete,
}: PdfCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card p-5 transition-all duration-300",
        "hover:border-accent/40 hover:shadow-md card-shadow animate-fade-in",
        isCompleted && "border-green-500/30 bg-green-50/50 dark:bg-green-950/20"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Action buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        {onToggleComplete && (
          <button
            onClick={onToggleComplete}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              isCompleted
                ? "text-green-600 bg-green-100 dark:bg-green-900/30"
                : "text-muted-foreground hover:text-green-600 hover:bg-secondary"
            )}
            title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            <CheckCircle2 className="h-4 w-4" />
          </button>
        )}
        {onToggleBookmark && (
          <button
            onClick={onToggleBookmark}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              isBookmarked
                ? "text-accent bg-accent/10"
                : "text-muted-foreground hover:text-accent hover:bg-secondary"
            )}
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
          </button>
        )}
      </div>

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
          {IconComponent ? <IconComponent className="h-6 w-6 text-accent" /> : <FileText className="h-6 w-6 text-accent" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-12">
          <h4 className="font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors">
            {title}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Actions - Preview only */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="default"
          size="sm"
          onClick={onPreview}
          className="w-full gap-2"
        >
          <Eye className="h-4 w-4" />
          Preview Notes
        </Button>
      </div>
    </div>
  );
}
