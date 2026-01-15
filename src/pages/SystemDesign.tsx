import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PdfCard } from "@/components/PdfCard";
import { PdfViewer } from "@/components/PdfViewer";
import { systemDesignResources } from "@/data/subjects";
import { BookOpen, Lightbulb, ExternalLink, Youtube } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useProgress } from "@/hooks/useProgress";

export default function SystemDesign() {
  const [selectedPdf, setSelectedPdf] = useState<{
    title: string;
    fileName: string;
  } | null>(null);
  
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isCompleted, toggleComplete } = useProgress();

  const pdfResources = systemDesignResources.filter((r) => r.type === "pdf");
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              System Design
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Learn to design scalable systems. Start with theory fundamentals, 
            then practice with real-world examples.
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

        {/* All Resources as Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {systemDesignResources.map((resource, index) => (
            resource.type === "pdf" ? (
              <PdfCard
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
                fileName={resource.fileName!}
                onPreview={() =>
                  setSelectedPdf({
                    title: resource.title,
                    fileName: resource.fileName!,
                  })
                }
                index={index}
                isBookmarked={isBookmarked(resource.id)}
                isCompleted={isCompleted(resource.id)}
                onToggleBookmark={() => toggleBookmark(resource.id)}
                onToggleComplete={() => toggleComplete(resource.id)}
              />
            ) : (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 card-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Youtube className="h-8 w-8 text-red-500" />
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
              </a>
            )
          ))}
        </div>

        {/* Info */}
        <div className="mt-12 p-6 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="font-display text-lg font-semibold text-foreground">
              Interview Tip
            </h3>
          </div>
          <p className="text-muted-foreground">
            In system design interviews, always clarify requirements first. 
            Start with high-level design, then dive into components. 
            Discuss trade-offs and explain your reasoning.
          </p>
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