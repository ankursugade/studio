
"use client";

import { useState } from "react";
import { QSStage, Project, User } from "@/lib/types";
import { ProjectCard } from "./project-card";
import { RevisionModal } from "./revision-modal";
import { ProjectDetailModal } from "./project-detail-modal";
import { ProjectLogModal } from "./project-log-modal";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useQSStore } from "@/hooks/use-qs-store";

interface KanbanBoardProps {
  projects: Project[];
  users: User[];
  stages: QSStage[];
  onUpdateStage: (projectId: string, toStageId: string, reason?: string) => void;
}

export function KanbanBoard({ projects, users, stages, onUpdateStage }: KanbanBoardProps) {
  const { updateProject } = useQSStore();
  const [revisionData, setRevisionData] = useState<{
    project: Project;
    toStage: QSStage;
  } | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [logProject, setLogProject] = useState<Project | null>(null);

  // Only show active projects on the Kanban board
  const activeProjects = projects.filter(p => p.status === 'active');

  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    e.dataTransfer.setData("projectId", projectId);
  };

  const handleDrop = (e: React.DragEvent, toStage: QSStage) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("projectId");
    const project = activeProjects.find(p => p.id === projectId);
    
    if (!project || project.currentStage === toStage.id) return;

    const fromIndex = stages.findIndex(s => s.id === project.currentStage);
    const toIndex = stages.findIndex(s => s.id === toStage.id);

    if (toIndex < fromIndex) {
      // Backward move: Require revision reason
      setRevisionData({ project, toStage });
    } else {
      // Forward move
      onUpdateStage(projectId, toStage.id);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleConfirmRevision = (reason: string) => {
    if (revisionData) {
      onUpdateStage(revisionData.project.id, revisionData.toStage.id, reason);
      setRevisionData(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 w-full pb-6">
        <div className="flex gap-6 p-4 min-h-full items-start">
          <TooltipProvider>
            {stages.map((stage) => {
              const stageProjects = activeProjects.filter(p => p.currentStage === stage.id);
              return (
                <div 
                  key={stage.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage)}
                  className="flex flex-col w-[300px] shrink-0 gap-4"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between bg-white p-4 rounded-lg border-b-2 border-primary shadow-sm cursor-help sticky top-0 z-10">
                        <h3 className="font-bold text-sm uppercase tracking-wider truncate mr-2">{stage.name}</h3>
                        <span className="bg-secondary/50 text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                          {stageProjects.length}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[250px] text-xs">
                      {stage.description}
                    </TooltipContent>
                  </Tooltip>
                  
                  <div className="flex flex-col gap-3 min-h-[150px] rounded-lg bg-muted/30 p-2 border-2 border-transparent hover:border-accent/10 transition-colors">
                    {stageProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        assignedUser={users.find(u => u.id === project.assignedTo)}
                        onDragStart={handleDragStart}
                        onClick={setSelectedProject}
                        onLogClick={setLogProject}
                      />
                    ))}
                    {stageProjects.length === 0 && (
                      <div className="flex items-center justify-center h-24 border-2 border-dashed border-muted-foreground/10 rounded-lg text-[10px] text-muted-foreground/40 uppercase tracking-widest text-center px-4">
                        Drop items here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </TooltipProvider>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <RevisionModal
        open={!!revisionData}
        project={revisionData?.project || null}
        toStage={revisionData?.toStage || null}
        onConfirm={handleConfirmRevision}
        onCancel={() => setRevisionData(null)}
      />

      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
        users={users}
        onUpdate={updateProject}
      />

      <ProjectLogModal
        project={logProject}
        open={!!logProject}
        onOpenChange={(open) => !open && setLogProject(null)}
        users={users}
      />
    </div>
  );
}
