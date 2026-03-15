
"use client";

import { useQSStore } from "@/hooks/use-qs-store";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { AvatarLogin } from "@/components/auth/avatar-login";

export default function KanbanPage() {
  const { currentUser, login, users, projects, updateProjectStage, isInitialized } = useQSStore();

  if (!isInitialized) return null;

  if (!currentUser) {
    return <AvatarLogin users={users} onSelect={login} />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold tracking-tight">MEP QS Workflow</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
                Drag cards to update stage
              </span>
            </div>
          </header>

          <main className="p-6 h-[calc(100vh-64px)] overflow-hidden">
            <KanbanBoard 
              projects={projects} 
              users={users} 
              onUpdateStage={updateProjectStage} 
            />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
