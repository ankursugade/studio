
"use client";

import { useQSStore } from "@/hooks/use-qs-store";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AvatarLogin } from "@/components/auth/avatar-login";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { NewProjectModal } from "@/components/kanban/new-project-modal";

export default function ProjectsPage() {
  const { currentUser, login, users, projects, stages, addProject, isInitialized } = useQSStore();

  if (!isInitialized) return null;

  if (!currentUser) {
    return <AvatarLogin users={users} onSelect={login} />;
  }

  const myProjects = projects.filter(p => p.assignedTo === currentUser.id);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold tracking-tight">My Projects</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground hidden sm:block">
                {myProjects.length} projects assigned
              </div>
              <NewProjectModal users={users} onAdd={addProject} />
            </div>
          </header>

          <main className="p-6 max-w-[1400px] mx-auto">
            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold">Project Title</TableHead>
                    <TableHead className="font-bold">Client</TableHead>
                    <TableHead className="font-bold">Current Stage</TableHead>
                    <TableHead className="font-bold">Estimated Value</TableHead>
                    <TableHead className="font-bold text-right">Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myProjects.length > 0 ? myProjects.map((p) => {
                    const stage = stages.find(s => s.id === p.currentStage);
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.title}</TableCell>
                        <TableCell className="text-muted-foreground">{p.client}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-secondary/20 text-secondary-foreground border-secondary">
                            {stage?.name || p.currentStage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {p.value ? new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0
                          }).format(p.value) : 'N/A'}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {format(new Date(p.updatedAt), 'MMM dd, yyyy')}
                        </TableCell>
                      </TableRow>
                    );
                  }) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                        No projects currently assigned to you.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
