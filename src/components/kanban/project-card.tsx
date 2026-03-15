
"use client";

import { Project, User } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { GripVertical, Building2, User2, Ruler, Tag, Briefcase, CheckSquare, ShieldCheck, History } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  assignedUser?: User;
  onDragStart: (e: React.DragEvent, projectId: string) => void;
  onClick: (project: Project) => void;
  onLogClick: (project: Project) => void;
}

export function ProjectCard({ project, assignedUser, onDragStart, onClick, onLogClick }: ProjectCardProps) {
  const openTasksCount = project.tasks?.filter(t => !t.isCompleted).length || 0;

  return (
    <Card 
      draggable
      onDragStart={(e) => onDragStart(e, project.id)}
      onClick={() => onClick(project)}
      className="group cursor-pointer active:cursor-grabbing hover:shadow-md transition-all border-l-4 border-l-accent bg-white"
    >
      <CardHeader className="p-3 pb-1 flex flex-row items-start justify-between space-y-0">
        <div className="flex-1 overflow-hidden">
          <h4 className="font-bold text-sm truncate leading-tight group-hover:text-accent transition-colors">
            {project.title}
          </h4>
          <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1 font-medium">
            <Tag className="h-3 w-3" /> {project.mainCategory}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-muted-foreground hover:text-accent hover:bg-accent/10"
            onClick={(e) => {
              e.stopPropagation();
              onLogClick(project);
            }}
          >
            <History className="h-4 w-4" />
          </Button>
          <GripVertical className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground cursor-grab" />
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-1 space-y-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            <span className="truncate font-semibold">{project.client}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
            <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-medium">
              <Ruler className="h-3 w-3 text-accent/70" />
              <span className="truncate">{project.areaSqFt?.toLocaleString()} sq.ft.</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-medium">
              <User2 className="h-3 w-3 text-primary/70" />
              <span className="truncate">{project.projectQsOwner}</span>
            </div>

            {project.mepDesignReviewer && (
              <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-medium">
                <ShieldCheck className="h-3 w-3 text-secondary-foreground/70" />
                <span className="truncate">MEP: {project.mepDesignReviewer}</span>
              </div>
            )}

            {project.itDesignReviewer && (
              <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-medium">
                <ShieldCheck className="h-3 w-3 text-secondary-foreground/70" />
                <span className="truncate">IT: {project.itDesignReviewer}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-1">
             <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Briefcase className="h-3 w-3" />
              <span>{project.contractType}</span>
            </div>
            {openTasksCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[9px] font-bold bg-accent/10 text-accent border-accent/20">
                <CheckSquare className="h-2.5 w-2.5 mr-1" />
                {openTasksCount} Tasks
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-muted">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-5 w-5 border border-muted">
              <AvatarImage src={assignedUser?.avatar} />
              <AvatarFallback className="text-[10px]">{assignedUser?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">
              {assignedUser?.name.split(' ')[0]}
            </span>
          </div>
          <span className="text-[9px] text-muted-foreground">
            {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
