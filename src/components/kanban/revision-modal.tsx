
"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QSStage, Project } from "@/lib/types";
import { suggestRevisionReasons } from "@/ai/flows/suggest-revision-reasons";
import { Sparkles, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RevisionModalProps {
  open: boolean;
  project: Project | null;
  toStage: QSStage | null;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export function RevisionModal({ open, project, toStage, onConfirm, onCancel }: RevisionModalProps) {
  const [reason, setReason] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  useEffect(() => {
    if (open && project && toStage) {
      setReason("");
      setSuggestions([]);
      handleGetAISuggestions();
    }
  }, [open, project, toStage]);

  const handleGetAISuggestions = async () => {
    if (!project || !toStage) return;
    
    setIsSuggesting(true);
    try {
      const result = await suggestRevisionReasons({
        fromStage: project.currentStage,
        toStage,
        projectDetails: `Project: ${project.title}, Client: ${project.client}`
      });
      setSuggestions(result.reasons);
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Reason for Revision
          </DialogTitle>
          <DialogDescription>
            A justification is required for moving the project backward in the workflow.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4 text-sm font-medium">
            <Badge variant="outline" className="px-3 py-1 bg-muted">{project?.currentStage}</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="outline" className="px-3 py-1 bg-accent text-accent-foreground">{toStage}</Badge>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reason">Detailed Reason</Label>
            <Textarea
              id="reason"
              placeholder="Explain why this project needs to be revised..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-accent" />
                AI Suggested Reasons
              </span>
              {isSuggesting && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {suggestions.length > 0 ? suggestions.map((s, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="h-auto text-left whitespace-normal text-xs py-1.5 border-dashed"
                  onClick={() => setReason(s)}
                >
                  {s}
                </Button>
              )) : !isSuggesting && (
                <span className="text-xs text-muted-foreground italic">No suggestions available.</span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button 
            onClick={() => onConfirm(reason)} 
            disabled={!reason.trim()}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Submit Revision
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
