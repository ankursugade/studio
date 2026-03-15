
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QSStage } from "@/lib/types";
import { Settings2, Plus, Trash2, ArrowUp, ArrowDown, Pencil, Check, X } from "lucide-react";

interface ManageStagesModalProps {
  stages: QSStage[];
  onUpdate: (stages: QSStage[]) => void;
}

export function ManageStagesModal({ stages, onUpdate }: ManageStagesModalProps) {
  const [open, setOpen] = useState(false);
  const [localStages, setLocalStages] = useState<QSStage[]>(stages);
  const [newStageName, setNewStageName] = useState("");
  const [newStageDesc, setNewStageDesc] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleAdd = () => {
    if (newStageName.trim()) {
      setLocalStages([...localStages, {
        id: Math.random().toString(36).substr(2, 9),
        name: newStageName.trim(),
        description: newStageDesc.trim() || "No description provided."
      }]);
      setNewStageName("");
      setNewStageDesc("");
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

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditName(localStages[index].name);
    setEditDesc(localStages[index].description);
  };

  const saveEdit = () => {
    if (editingIndex !== null && editName.trim()) {
      const updated = [...localStages];
      updated[editingIndex] = {
        ...updated[editingIndex],
        name: editName.trim(),
        description: editDesc.trim()
      };
      setLocalStages(updated);
      setEditingIndex(null);
    }
  };

  const handleSave = () => {
    onUpdate(localStages);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (val) {
        setLocalStages(stages);
        setEditingIndex(null);
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Manage Stages
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Workflow Stages</DialogTitle>
          <DialogDescription>
            Configure the stages of your MEP QS pipeline. Hover over titles on the board to see descriptions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex flex-col gap-3 p-4 bg-muted/30 rounded-lg border border-dashed">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Add New Stage</h4>
            <div className="grid gap-2">
              <Label htmlFor="stage-name" className="text-xs">Stage Name</Label>
              <Input 
                id="stage-name"
                placeholder="e.g. Pre-tender Review" 
                value={newStageName} 
                onChange={(e) => setNewStageName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stage-desc" className="text-xs">Description (shown on hover)</Label>
              <Textarea 
                id="stage-desc"
                placeholder="Briefly describe the objective of this stage..." 
                value={newStageDesc} 
                onChange={(e) => setNewStageDesc(e.target.value)}
                className="min-h-[60px] resize-none"
              />
            </div>
            <Button size="sm" onClick={handleAdd} disabled={!newStageName.trim()} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Stage
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground px-1">Active Pipeline</h4>
            <div className="border rounded-md divide-y max-h-[350px] overflow-y-auto bg-white">
              {localStages.map((stage, index) => (
                <div key={stage.id} className="flex flex-col p-3 transition-colors hover:bg-muted/5">
                  {editingIndex === index ? (
                    <div className="space-y-3 p-1">
                      <Input 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)} 
                        placeholder="Stage Name"
                        className="h-8 font-bold"
                      />
                      <Textarea 
                        value={editDesc} 
                        onChange={(e) => setEditDesc(e.target.value)} 
                        placeholder="Stage Description"
                        className="min-h-[60px] text-xs resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingIndex(null)} className="h-7 px-2">
                          <X className="h-3 w-3 mr-1" /> Cancel
                        </Button>
                        <Button variant="secondary" size="sm" onClick={saveEdit} className="h-7 px-2">
                          <Check className="h-3 w-3 mr-1" /> Done
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-bold truncate">{stage.name}</span>
                        <span className="text-[11px] text-muted-foreground truncate italic">
                          {stage.description}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-accent"
                          onClick={() => startEditing(index)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <div className="flex flex-col gap-0 border-x px-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5"
                            onClick={() => handleMove(index, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5"
                            onClick={() => handleMove(index, 'down')}
                            disabled={index === localStages.length - 1}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive/60 hover:text-destructive"
                          onClick={() => handleRemove(index)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {localStages.length === 0 && (
                <div className="p-8 text-center text-sm text-muted-foreground italic">
                  No stages defined.
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground">
            Save All Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
