import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Cpu, BookOpen, Code, ArrowRight, Sparkles } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { subjects, systemDesignResources } from "@/data/subjects";
import { MessageSquare } from "lucide-react";

const features = [{
  icon: Cpu,
  title: "Computer Fundamentals",
  description: "OS, DBMS, OOPs, Networks, Cloud, SDLC, DevOps",
  path: "/fundamentals",
  color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
}, {
  icon: BookOpen,
  title: "System Design",
  description: "Theory concepts & real-world examples",
  path: "/system-design",
  color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
}, {
  icon: Code,
  title: "Coding Practice",
  description: "Curated DSA practice resources",
  path: "/coding",
  color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
}, {
  icon: MessageSquare,
  title: "Interview Prep",
  description: "Java, OOP, DBMS & system design Q&A",
  path: "/interview",
  color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
}];
export default function Index() {
  const {
    completedItems
  } = useProgress();

  // Calculate total items for progress
  const totalFundamentals = subjects.length;
  const totalSystemDesign = systemDesignResources.filter(r => r.type === "pdf").length;
  const totalItems = totalFundamentals + totalSystemDesign;
  const progressPercent = totalItems > 0 ? Math.round(completedItems.length / totalItems * 100) : 0;
  return <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>Handwritten notes for placements</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight animate-fade-in">
              My{" "}
              <span className="gradient-text">Handwritten</span>
              <br />
              Placement Notes
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-in">
              Personal study notes covering CS fundamentals, system design, and curated coding resources — 
              everything I used to prepare for product-based companies.
            </p>

            {/* Progress indicator */}
            {completedItems.length > 0 && <div className="mt-8 max-w-xs mx-auto animate-fade-in">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>Your progress</span>
                  <span>{progressPercent}% complete</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>}

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Button asChild size="lg" className="gap-2 px-6">
                <Link to="/fundamentals">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6">
                <Link to="/system-design">
                  Explore System Design
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              What's Inside
            </h2>
            <p className="mt-3 text-muted-foreground">
              Organized notes for efficient learning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => <Link key={feature.path} to={feature.path} className="group animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 card-shadow">
                  <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </Layout>;
}