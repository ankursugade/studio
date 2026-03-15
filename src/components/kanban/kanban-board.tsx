
"use client";

import { useState } from "react";
import { QSStage, Project, User } from "@/lib/types";
import { ProjectCard } from "./project-card";
import { RevisionModal } from "./revision-modal";
import { ProjectDetailModal } from "./project-detail-modal";
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

  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    e.dataTransfer.setData("projectId", projectId);
  };

  const handleDrop = (e: React.DragEvent, toStage: QSStage) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("projectId");
    const project = projects.find(p => p.id === projectId);
    
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
    <div className="h-full">
      <ScrollArea className="h-full w-full pb-6">
        <div className="flex gap-6 h-full p-2 min-h-[calc(100vh-200px)]">
          <TooltipProvider>
            {stages.map((stage) => {
              const stageProjects = projects.filter(p => p.currentStage === stage.id);
              return (
                <div 
                  key={stage.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage)}
                  className="flex flex-col w-[300px] shrink-0 gap-4"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between bg-white p-4 rounded-lg border-b-2 border-primary shadow-sm cursor-help">
                        <h3 className="font-bold text-sm uppercase tracking-wider">{stage.name}</h3>
                        <span className="bg-secondary/50 text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                          {stageProjects.length}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[250px] text-xs">
                      {stage.description}
                    </TooltipContent>
                  </Tooltip>
                  
                  <div className="flex flex-col gap-3 h-full rounded-lg bg-muted/30 p-2">
                    {stageProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        assignedUser={users.find(u => u.id === project.assignedTo)}
                        onDragStart={handleDragStart}
                        onClick={setSelectedProject}
                      />
                    ))}
                    {stageProjects.length === 0 && (
                      <div className="flex items-center justify-center h-20 border-2 border-dashed border-muted-foreground/20 rounded-lg text-xs text-muted-foreground/50">
                        Empty stage
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
    </div>
  );
}
