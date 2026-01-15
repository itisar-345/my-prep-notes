import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileName: string;
}

export function PdfViewer({ isOpen, onClose, title, fileName }: PdfViewerProps) {
  // Check if fileName is a full URL (Google Drive, etc.) or a local file
  const isExternalUrl = fileName.startsWith("http");
  const pdfUrl = isExternalUrl ? fileName : `/pdfs/${fileName}`;
  
  // For Google Drive, convert preview URL to view URL for opening in new tab
  const viewUrl = isExternalUrl 
    ? fileName.replace("/preview", "/view") 
    : pdfUrl;

  const handleOpenInNewTab = () => {
    window.open(viewUrl, "_blank");
  };

  const handlePrint = () => {
    if (isExternalUrl) {
      // For external URLs, just open in new tab (can't control print)
      window.open(viewUrl, "_blank");
    } else {
      const printWindow = window.open(pdfUrl, "_blank");
      if (printWindow) {
        printWindow.addEventListener("load", () => {
          printWindow.print();
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-display text-lg">{title}</DialogTitle>
            <Button
              variant="default"
              size="sm"
              onClick={handleOpenInNewTab}
              className="gap-2 mr-8"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Open in Tab</span>
            </Button>
          </div>
        </DialogHeader>

        {/* PDF Embed */}
        <div className="flex-1 bg-muted overflow-hidden relative">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title={title}
          />
          {/* Fallback for when PDF doesn't load */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none opacity-0 transition-opacity [iframe:not([src])~&]:opacity-100">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              PDF Preview
            </h3>
            <p className="text-muted-foreground max-w-md">
              In production, your PDF files would be displayed here. Add PDF files to the{" "}
              <code className="px-1.5 py-0.5 bg-secondary rounded text-sm">public/pdfs/</code>{" "}
              folder.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
