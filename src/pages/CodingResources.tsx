import { Layout } from "@/components/Layout";
import { codingResources } from "@/data/subjects";
import { Code, ExternalLink, TrendingUp, Target } from "lucide-react";

export default function CodingResources() {
  return (
    <Layout>
      <div className="container py-10 md:py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Code className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Coding Resources
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Practice DSA problems regularly. These curated resources will help you 
            prepare for coding rounds.
          </p>
        </div>

        {/* Resource Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingResources.map((resource, index) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="h-full rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 card-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <resource.icon className="h-5 w-5 text-accent" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 ml-2" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                  {resource.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {resource.description}
                </p>
                <div className="mt-4 pt-3 border-t border-border">
                  <span className="text-sm font-medium text-accent">
                    Visit →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Practice Strategy
              </h3>
            </div>
            <ul className="text-muted-foreground space-y-2">
              <li>• Start with Easy problems to build confidence</li>
              <li>• Focus on understanding patterns, not memorizing solutions</li>
              <li>• Aim for 2-3 problems daily for consistent progress</li>
              <li>• Revise problems you've solved after a week</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Key Topics for Interviews
              </h3>
            </div>
            <p className="text-muted-foreground">
              Arrays, Strings, Linked Lists, Trees, Graphs, Dynamic Programming, 
              Binary Search, Two Pointers, Sliding Window, Stack & Queue.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
