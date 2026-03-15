
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/types";
import { Ruler, Clock, Trophy, XCircle } from "lucide-react";

interface StatsGridProps {
  projects: Project[];
}

export function StatsGrid({ projects }: StatsGridProps) {
  const totalArea = projects.reduce((sum, p) => sum + (p.areaSqFt || 0), 0);
  const formattedArea = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(totalArea) + " sq.ft.";

  const wonCount = projects.filter(p => p.status === 'won').length;
  const lostCount = projects.filter(p => p.status === 'lost').length;
  const activeCount = projects.filter(p => p.status === 'active').length;

  const stats = [
    { title: "Total Area", value: formattedArea, icon: Ruler, color: "text-accent" },
    { title: "Active Projects", value: activeCount.toString(), icon: Clock, color: "text-blue-600" },
    { title: "WON Projects", value: wonCount.toString(), icon: Trophy, color: "text-green-600" },
    { title: "LOST Projects", value: lostCount.toString(), icon: XCircle, color: "text-destructive" },
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
