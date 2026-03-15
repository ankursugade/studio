
"use client";

import { Project, User } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { GripVertical, Building2, User2, DollarSign, Tag, Briefcase } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  assignedUser?: User;
  onDragStart: (e: React.DragEvent, projectId: string) => void;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, assignedUser, onDragStart, onClick }: ProjectCardProps) {
  const formattedValue = project.value ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(project.value) : 'N/A';

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
        <GripVertical className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground cursor-grab" />
      </CardHeader>
      <CardContent className="p-3 pt-1 space-y-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            <span className="truncate">{project.client}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
            <Briefcase className="h-3 w-3" />
            <span>{project.contractType} - {project.pricingModel}</span>
          </div>
          {project.value && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-secondary-foreground bg-secondary/30 w-fit px-1.5 py-0.5 rounded">
              <DollarSign className="h-3 w-3" />
              <span>{formattedValue}</span>
            </div>
          )}
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
          <span className="text-[10px] text-muted-foreground">
            {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
