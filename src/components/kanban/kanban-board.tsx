
"use client";

import { useState } from "react";
import { QSStage, QS_STAGES, Project, User } from "@/lib/types";
import { ProjectCard } from "./project-card";
import { RevisionModal } from "./revision-modal";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface KanbanBoardProps {
  projects: Project[];
  users: User[];
  onUpdateStage: (projectId: string, toStage: QSStage, reason?: string) => void;
}

export function KanbanBoard({ projects, users, onUpdateStage }: KanbanBoardProps) {
  const [revisionData, setRevisionData] = useState<{
    project: Project;
    toStage: QSStage;
  } | null>(null);

  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    e.dataTransfer.setData("projectId", projectId);
  };

  const handleDrop = (e: React.DragEvent, toStage: QSStage) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("projectId");
    const project = projects.find(p => p.id === projectId);
    
    if (!project || project.currentStage === toStage) return;

    const fromIndex = QS_STAGES.indexOf(project.currentStage);
    const toIndex = QS_STAGES.indexOf(toStage);

    if (toIndex < fromIndex) {
      // Backward move: Require revision reason
      setRevisionData({ project, toStage });
    } else {
      // Forward move: Log automatically
      onUpdateStage(projectId, toStage);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleConfirmRevision = (reason: string) => {
    if (revisionData) {
      onUpdateStage(revisionData.project.id, revisionData.toStage, reason);
      setRevisionData(null);
    }
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full w-full pb-6">
        <div className="flex gap-6 h-full p-2 min-h-[calc(100vh-200px)]">
          {QS_STAGES.map((stage) => {
            const stageProjects = projects.filter(p => p.currentStage === stage);
            return (
              <div 
                key={stage}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
                className="flex flex-col w-[300px] shrink-0 gap-4"
              >
                <div className="flex items-center justify-between bg-white p-4 rounded-lg border-b-2 border-primary shadow-sm">
                  <h3 className="font-bold text-sm uppercase tracking-wider">{stage}</h3>
                  <span className="bg-secondary/50 text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {stageProjects.length}
                  </span>
                </div>
                
                <div className="flex flex-col gap-3 h-full rounded-lg bg-muted/30 p-2">
                  {stageProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      assignedUser={users.find(u => u.id === project.assignedTo)}
                      onDragStart={handleDragStart}
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
    </div>
  );
}
