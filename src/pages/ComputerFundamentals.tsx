import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PdfCard } from "@/components/PdfCard";
import { PdfViewer } from "@/components/PdfViewer";
import { subjects } from "@/data/subjects";
import { Cpu, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useProgress } from "@/hooks/useProgress";

export default function ComputerFundamentals() {
  const [selectedPdf, setSelectedPdf] = useState<{
    title: string;
    fileName: string;
  } | null>(null);

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isCompleted, toggleComplete } = useProgress();

  const completedCount = subjects.filter((s) => isCompleted(s.id)).length;
  const progressPercent = subjects.length > 0 
    ? Math.round((completedCount / subjects.length) * 100) 
    : 0;

  return (
    <Layout>
      <div className="container py-10 md:py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Cpu className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Computer Fundamentals
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Master the core computer science concepts asked in technical interviews.
            Each subject contains my handwritten notes.
          </p>

          {/* Progress bar */}
          <div className="mt-6 max-w-md">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{completedCount} / {subjects.length} completed</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject, index) => (
            <PdfCard
              key={subject.id}
              id={subject.id}
              title={subject.name}
              description={subject.description}
              fileName={subject.fileName}
              icon={subject.icon}
              onPreview={() =>
                setSelectedPdf({
                  title: subject.name,
                  fileName: subject.fileName,
                })
              }
              index={index}
              isBookmarked={isBookmarked(subject.id)}
              isCompleted={isCompleted(subject.id)}
              onToggleBookmark={() => toggleBookmark(subject.id)}
              onToggleComplete={() => toggleComplete(subject.id)}
            />
          ))}
        </div>

        {/* Info */}
        <div className="mt-12 p-6 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="font-display text-lg font-semibold text-foreground">
              Study Tip
            </h3>
          </div>
          <p className="text-muted-foreground">
            Start with OS and DBMS for core interviews, focus on OOPs for Java roles, prepare Networks and Cloud for system design, and cover SDLC and DevOps to understand end-to-end software development and deployment.
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
