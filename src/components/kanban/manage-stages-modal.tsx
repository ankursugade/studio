
"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QSStage } from "@/lib/types";
import { Settings2, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface ManageStagesModalProps {
  stages: QSStage[];
  onUpdate: (stages: QSStage[]) => void;
}

export function ManageStagesModal({ stages, onUpdate }: ManageStagesModalProps) {
  const [open, setOpen] = useState(false);
  const [localStages, setLocalStages] = useState<QSStage[]>(stages);
  const [newStageName, setNewStageName] = useState("");

  const handleAdd = () => {
    if (newStageName.trim()) {
      setLocalStages([...localStages, newStageName.trim()]);
      setNewStageName("");
    }
  };

  const handleRemove = (index: number) => {
    setLocalStages(localStages.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newPos = direction === 'up' ? index - 1 : index + 1;
    if (newPos < 0 || newPos >= localStages.length) return;
    
    const updated = [...localStages];
    [updated[index], updated[newPos]] = [updated[newPos], updated[index]];
    setLocalStages(updated);
  };

  const handleSave = () => {
    onUpdate(localStages);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (val) setLocalStages(stages);
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Manage Stages
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Workflow Stages</DialogTitle>
          <DialogDescription>
            Add, remove, or reorder the stages in your MEP QS workflow.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <Input 
              placeholder="New stage name..." 
              value={newStageName} 
              onChange={(e) => setNewStageName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <Button size="icon" onClick={handleAdd} disabled={!newStageName.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
            {localStages.map((stage, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card">
                <span className="text-sm font-medium">{stage}</span>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === localStages.length - 1}
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleRemove(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
