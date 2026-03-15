
"use client";

import { useQSStore } from "@/hooks/use-qs-store";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { AvatarLogin } from "@/components/auth/avatar-login";
import { NewProjectModal } from "@/components/kanban/new-project-modal";
import { ManageStagesModal } from "@/components/kanban/manage-stages-modal";

export default function KanbanPage() {
  const { 
    currentUser, 
    login, 
    users, 
    projects, 
    stages,
    updateProjectStage, 
    addProject, 
    updateStages,
    isInitialized 
  } = useQSStore();

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
            <div className="flex items-center gap-4">
              {currentUser.isAdmin && (
                <ManageStagesModal stages={stages} onUpdate={updateStages} />
              )}
              <NewProjectModal users={users} onAdd={addProject} />
            </div>
          </header>

          <main className="p-6 h-[calc(100vh-64px)] overflow-hidden">
            <KanbanBoard 
              projects={projects} 
              users={users} 
              stages={stages}
              onUpdateStage={updateProjectStage} 
            />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
