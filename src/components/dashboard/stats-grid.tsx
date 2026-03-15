
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, Revision } from "@/lib/types";
import { Ruler, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface StatsGridProps {
  projects: Project[];
  revisions: Revision[];
  lastStageId?: string;
}

export function StatsGrid({ projects, revisions, lastStageId }: StatsGridProps) {
  const totalArea = projects.reduce((sum, p) => sum + (p.areaSqFt || 0), 0);
  const formattedArea = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(totalArea) + " sq.ft.";

  const completed = lastStageId ? projects.filter(p => p.currentStage === lastStageId).length : 0;
  const activeRevisions = revisions.length;

  const stats = [
    { title: "Total Area", value: formattedArea, icon: Ruler, color: "text-accent" },
    { title: "Active Projects", value: projects.length.toString(), icon: Clock, color: "text-secondary-foreground" },
    { title: "Completed", value: completed.toString(), icon: CheckCircle2, color: "text-green-600" },
    { title: "Recent Revisions", value: activeRevisions.toString(), icon: AlertCircle, color: "text-destructive" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
