
"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Project, User } from "@/lib/types";
import { History, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface ProjectLogModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: User[];
}

export function ProjectLogModal({ project, open, onOpenChange, users }: ProjectLogModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[70vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 border-b bg-white">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <History className="h-5 w-5 text-accent" />
            Automatic Activity Log
          </DialogTitle>
          <DialogDescription>
            System-generated audit trail and history for <strong>{project.title}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0 bg-muted/20">
          <ScrollArea className="flex-1 px-6">
            <div className="py-6 space-y-6">
              {project.logs && project.logs.length > 0 ? project.logs.map((log) => {
                const user = users.find(u => u.id === log.userId);
                return (
                  <div key={log.id} className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0 mt-0.5 border shadow-sm">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-muted text-[10px]">{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{user?.name}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium bg-white px-1.5 py-0.5 rounded border">
                          <Clock className="h-2.5 w-2.5" />
                          {format(log.timestamp, "MMM dd, HH:mm")}
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border shadow-sm text-sm text-foreground leading-relaxed">
                        {log.message}
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-2 opacity-40">
                  <History className="h-12 w-12" />
                  <p className="text-sm italic">No automated entries recorded yet.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="p-4 border-t bg-white">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full font-bold">
            Close Activity Log
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
