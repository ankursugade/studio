
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
import { Settings2, Plus, Trash2, ArrowUp, ArrowDown, Pencil, Check, X, GripVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
        <Button variant="outline" size="sm" className="gap-2 font-semibold">
          <Settings2 className="h-4 w-4" />
          Manage Stages
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] h-[75vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-6 bg-white border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Workflow Pipeline</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Define the sequence of stages for your MEP Quantity Surveying projects.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <ScrollArea className="flex-1 px-6 bg-background/50">
          <div className="space-y-8 py-6">
            {/* Add New Stage Section */}
            <div className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1 bg-accent/10 rounded">
                  <Plus className="h-4 w-4 text-accent" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Add New Stage</h4>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="stage-name" className="text-[11px] font-bold text-muted-foreground ml-1">STAGE NAME</Label>
                  <Input 
                    id="stage-name"
                    placeholder="e.g. Pre-tender Review" 
                    value={newStageName} 
                    onChange={(e) => setNewStageName(e.target.value)}
                    className="h-9 focus:ring-accent"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="stage-desc" className="text-[11px] font-bold text-muted-foreground ml-1">DESCRIPTION</Label>
                  <Textarea 
                    id="stage-desc"
                    placeholder="What happens in this stage?" 
                    value={newStageDesc} 
                    onChange={(e) => setNewStageDesc(e.target.value)}
                    className="min-h-[70px] resize-none text-sm"
                  />
                </div>
              </div>
              
              <Button 
                size="sm" 
                onClick={handleAdd} 
                disabled={!newStageName.trim()} 
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold"
              >
                Create Stage
              </Button>
            </div>

            {/* Active Pipeline List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Pipeline</h4>
                <span className="text-[10px] font-medium bg-muted px-2 py-0.5 rounded-full">{localStages.length} STAGES</span>
              </div>
              
              <div className="space-y-2.5">
                {localStages.map((stage, index) => (
                  <div 
                    key={stage.id} 
                    className={cn(
                      "group bg-white rounded-lg border p-3 transition-all duration-200",
                      editingIndex === index ? "ring-2 ring-accent/20 border-accent" : "hover:border-accent/40 hover:shadow-sm"
                    )}
                  >
                    {editingIndex === index ? (
                      <div className="space-y-3">
                        <Input 
                          value={editName} 
                          onChange={(e) => setEditName(e.target.value)} 
                          placeholder="Stage Name"
                          className="h-9 font-bold text-sm"
                          autoFocus
                        />
                        <Textarea 
                          value={editDesc} 
                          onChange={(e) => setEditDesc(e.target.value)} 
                          placeholder="Stage Description"
                          className="min-h-[60px] text-xs resize-none"
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingIndex(null)} className="h-8 text-xs">
                            Cancel
                          </Button>
                          <Button variant="secondary" size="sm" onClick={saveEdit} className="h-8 text-xs font-bold">
                            <Check className="h-3 w-3 mr-1" /> Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center gap-0.5 text-muted-foreground/30">
                          <GripVertical className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-muted-foreground/40 font-mono">{(index + 1).toString().padStart(2, '0')}</span>
                            <span className="text-sm font-bold truncate">{stage.name}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate italic mt-0.5 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex flex-col gap-0.5 mr-1 border-r pr-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-muted-foreground hover:bg-muted"
                              onClick={() => handleMove(index, 'up')}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-muted-foreground hover:bg-muted"
                              onClick={() => handleMove(index, 'down')}
                              disabled={index === localStages.length - 1}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/5"
                            onClick={() => startEditing(index)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive/40 hover:text-destructive hover:bg-destructive/5"
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
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-2 bg-muted/20 rounded-xl border-2 border-dashed">
                    <Settings2 className="h-8 w-8 text-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground font-medium italic">No stages defined in your pipeline.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 bg-white border-t">
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setOpen(false)} className="font-semibold">Discard</Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground font-bold px-8 shadow-lg shadow-primary/20">
              Apply Workflow
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
