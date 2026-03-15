
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

  // Aggregate project count per stage for the chart
  const stageData = stages.map(stage => ({
    name: stage,
    count: projects.filter(p => p.currentStage === stage).length
  }));

  const lastStage = stages[stages.length - 1];
  const completedCount = projects.filter(p => p.currentStage === lastStage).length;

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
            <StatsGrid projects={projects} revisions={revisions} lastStage={lastStage} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Workflow Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stageData}>
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
                            {stageData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={index % 2 === 0 ? "hsl(var(--accent))" : "hsl(var(--secondary))"} 
                              />
                            ))}
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
                />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
