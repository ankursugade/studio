
"use client";

import { Revision, Project, User } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, ArrowLeftRight } from "lucide-react";

interface ActivityFeedProps {
  revisions: Revision[];
  projects: Project[];
  users: User[];
}

export function ActivityFeed({ revisions, projects, users }: ActivityFeedProps) {
  return (
    <Card className="h-full border-none shadow-sm flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <History className="h-5 w-5 text-accent" />
          Revision History
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-6">
            {revisions.length > 0 ? revisions.map((rev) => {
              const project = projects.find(p => p.id === rev.projectId);
              const user = users.find(u => u.id === rev.userId);
              
              return (
                <div key={rev.id} className="flex gap-3 relative">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-semibold truncate leading-none">
                        {user?.name}
                      </p>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(rev.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
                      <span className="font-bold text-foreground">Project: {project?.title}</span>
                      <div className="flex items-center gap-2 mt-1 mb-2">
                        <span className="text-accent">{rev.fromStage}</span>
                        <ArrowLeftRight className="h-3 w-3" />
                        <span className="text-secondary-foreground">{rev.toStage}</span>
                      </div>
                      <p className="italic border-l-2 border-accent/50 pl-2 mt-2 text-foreground">
                        "{rev.reason}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-sm gap-2">
                <History className="h-12 w-12 opacity-10" />
                <p>No recent revisions recorded.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
