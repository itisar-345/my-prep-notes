import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PdfCard } from "@/components/PdfCard";
import { PdfViewer } from "@/components/PdfViewer";
import { interviewResources } from "@/data/subjects";
import { Progress } from "@/components/ui/progress";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useProgress } from "@/hooks/useProgress";
import { MessageSquare, ExternalLink, Youtube } from "lucide-react";

export default function InterviewPrep() {
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; fileName: string } | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isCompleted, toggleComplete } = useProgress();

  const pdfResources = interviewResources.filter((r) => r.type === "pdf");
  const linkResources = interviewResources.filter((r) => r.type === "link");
  const completedCount = pdfResources.filter((r) => isCompleted(r.id)).length;
  const progressPercent = pdfResources.length > 0 
    ? Math.round((completedCount / pdfResources.length) * 100) 
    : 0;

  return (
    <Layout>
      <div className="container py-10 md:py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Interview Prep
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Q&A covering Java, OOP concepts, DBMS, and system design definitions with video resources.
          </p>

          {/* Progress bar */}
          <div className="mt-6 max-w-md">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{completedCount} / {pdfResources.length} completed</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
          {/* PDF Resources */}
          {pdfResources.map((resource, index) => (
            <PdfCard
              key={resource.id}
              id={resource.id}
              title={resource.title}
              description={resource.description}
              fileName={resource.fileName || ""}
              onPreview={() =>
                setSelectedPdf({
                  title: resource.title,
                  fileName: resource.fileName || "",
                })
              }
              index={index}
              isBookmarked={isBookmarked(resource.id)}
              isCompleted={isCompleted(resource.id)}
              onToggleBookmark={() => toggleBookmark(resource.id)}
              onToggleComplete={() => toggleComplete(resource.id)}
            />
          ))}

          {/* Link Resources (Playlist) */}
          {linkResources.map((resource, index) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block animate-fade-in"
              style={{ animationDelay: `${(pdfResources.length + index) * 50}ms` }}
            >
              <div className="h-full rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 card-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                    <Youtube className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                        {resource.title}
                      </h4>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 ml-2" />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {resource.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-sm font-medium text-accent">
                    Watch on YouTube →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PdfViewer
        isOpen={!!selectedPdf}
        onClose={() => setSelectedPdf(null)}
        title={selectedPdf?.title || ""}
        fileName={selectedPdf?.fileName || ""}
      />
    </Layout>
  );
}
