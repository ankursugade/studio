
"use client";

import { useQSStore } from "@/hooks/use-qs-store";
import { AvatarLogin } from "@/components/auth/avatar-login";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Home() {
  const { currentUser, login, users, projects, stages, revisions, isInitialized } = useQSStore();

  if (!isInitialized) return null;

  if (!currentUser) {
    return <AvatarLogin users={users} onSelect={login} />;
  }

  // Aggregate active project count per stage for the chart
  const activeProjects = projects.filter(p => p.status === 'active');
  
  const stageData = stages.map(stage => ({
    name: stage.name,
    count: activeProjects.filter(p => p.currentStage === stage.id).length
  }));

  // Add Won/Lost as separate totals for visualization if desired, or just keep active pipeline
  const wonCount = projects.filter(p => p.status === 'won').length;
  const lostCount = projects.filter(p => p.status === 'lost').length;

  const summaryData = [
    ...stageData,
    { name: 'WON', count: wonCount },
    { name: 'LOST', count: lostCount }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold tracking-tight">Dashboard Overview</h1>
            </div>
            <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border">
              Global Statistics
            </div>
          </header>

          <main className="p-6 space-y-8 max-w-[1400px] mx-auto">
            <StatsGrid projects={projects} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Project Distribution (Pipeline + Results)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={summaryData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                          <XAxis 
                            dataKey="name" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            interval={0}
                            angle={-15}
                            textAnchor="end"
                          />
                          <YAxis fontSize={10} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                          />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {summaryData.map((entry, index) => {
                              let fill = "hsl(var(--accent))";
                              if (entry.name === 'WON') fill = "hsl(142, 76%, 36%)"; // green
                              if (entry.name === 'LOST') fill = "hsl(0, 84%, 60%)"; // red
                              else if (index % 2 !== 0) fill = "hsl(var(--secondary))";
                              
                              return <Cell key={`cell-${index}`} fill={fill} />;
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <ActivityFeed 
                  revisions={revisions} 
                  projects={projects} 
                  users={users}
                  stages={stages}
                />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
