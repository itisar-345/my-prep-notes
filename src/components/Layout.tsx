import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen, Cpu, Code, MessageSquare, Menu, X, Search, Moon, Sun, PenLine, Github } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { SearchDialog } from "@/components/SearchDialog";
import { PdfViewer } from "@/components/PdfViewer";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/fundamentals", label: "Computer Fundamentals", icon: Cpu },
  { path: "/system-design", label: "System Design", icon: BookOpen },
  { path: "/coding", label: "Coding Practice", icon: Code },
  { path: "/interview", label: "Interview Prep", icon: MessageSquare },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; fileName: string } | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleSelectPdf = (title: string, fileName: string) => {
    setSelectedPdf({ title, fileName });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2.5 font-display text-xl font-semibold text-foreground transition-colors hover:text-accent"
          >
            <PenLine className="h-6 w-6 text-accent" />
            <span>My Notes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <nav className="container py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="animate-fade-in">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>Handwritten notes for placement preparation.</p>
          <a 
            href="https://github.com/itisar-345" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>Connect on GitHub</span>
          </a>
        </div>
      </footer>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectPdf={handleSelectPdf}
      />

      {/* PDF Viewer from Search */}
      <PdfViewer
        isOpen={!!selectedPdf}
        onClose={() => setSelectedPdf(null)}
        title={selectedPdf?.title || ""}
        fileName={selectedPdf?.fileName || ""}
      />
    </div>
  );
}
