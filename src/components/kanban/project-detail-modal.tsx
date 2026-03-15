
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project, User, ProjectMainCategory, ProjectSubCategory, ContractType, PricingModel } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, CheckSquare, Square, Calculator, Layers, Ruler, Trophy, XCircle, RotateCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: User[];
  onUpdate: (projectId: string, updates: Partial<Project>) => void;
}

export function ProjectDetailModal({ project, open, onOpenChange, users, onUpdate }: ProjectDetailModalProps) {
  const [formData, setFormData] = useState<Project | null>(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (project) {
      setFormData({ ...project });
    }
  }, [project, open]);

  if (!formData) return null;

  const handleChange = (field: keyof Project, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSave = () => {
    if (formData && project) {
      onUpdate(project.id, formData);
      onOpenChange(false);
    }
  };

  const setStatus = (status: 'active' | 'won' | 'lost') => {
    if (formData && project) {
      onUpdate(project.id, { ...formData, status });
      onOpenChange(false);
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask,
      isCompleted: false
    };
    const updatedTasks = [...(formData.tasks || []), task];
    handleChange('tasks', updatedTasks);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    const updatedTasks = formData.tasks.map(t => 
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    handleChange('tasks', updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = formData.tasks.filter(t => t.id !== id);
    handleChange('tasks', updatedTasks);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px] h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Calculator className="h-6 w-6 text-accent" />
              Project Parameters
            </DialogTitle>
            <DialogDescription>
              Detailed technical and commercial parameters for {project?.title}.
            </DialogDescription>
          </div>
          <div className="flex items-center gap-2">
            {formData.status === 'won' && <Badge className="bg-green-600">WON</Badge>}
            {formData.status === 'lost' && <Badge variant="destructive">LOST</Badge>}
            {formData.status === 'active' && <Badge variant="outline">ACTIVE</Badge>}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8">
            {/* Project Outcome Actions */}
            <div className="bg-muted/30 p-4 rounded-xl border border-dashed flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-bold">Project Outcome</h4>
                <p className="text-xs text-muted-foreground">Finalize this project by marking it as WON or LOST.</p>
              </div>
              <div className="flex gap-2">
                {formData.status !== 'active' ? (
                  <Button variant="outline" size="sm" onClick={() => setStatus('active')} className="gap-2">
                    <RotateCcw className="h-4 w-4" /> Reactivate
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setStatus('lost')} className="text-destructive hover:bg-destructive/5 gap-2">
                      <XCircle className="h-4 w-4" /> Mark LOST
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setStatus('won')} className="text-green-600 hover:bg-green-50 border-green-200 gap-2">
                      <Trophy className="h-4 w-4" /> Mark WON
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input value={formData.title} onChange={e => handleChange('title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Client</Label>
                <Input value={formData.client} onChange={e => handleChange('client', e.target.value)} />
              </div>
            </div>

            <Separator />

            {/* Categorization & Contract */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Project Classification</h4>
                <div className="space-y-2">
                  <Label>Main Category</Label>
                  <Select value={formData.mainCategory} onValueChange={val => handleChange('mainCategory', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Interior fit out">Interior fit out</SelectItem>
                      <SelectItem value="Interior + Base build">Interior + Base build</SelectItem>
                      <SelectItem value="Refurbishment">Refurbishment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sub Category</Label>
                  <Select value={formData.subCategory} onValueChange={val => handleChange('subCategory', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Office + Lab">Office + Lab</SelectItem>
                      <SelectItem value="Lab Only">Lab Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Commercial Details</h4>
                <div className="space-y-2">
                  <Label>Contract Type</Label>
                  <Select value={formData.contractType} onValueChange={val => handleChange('contractType', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lumsum">Lumsum</SelectItem>
                      <SelectItem value="Measurable">Measurable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pricing Model</Label>
                  <Select value={formData.pricingModel} onValueChange={val => handleChange('pricingModel', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Close Book">Close Book</SelectItem>
                      <SelectItem value="Open Book">Open Book</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Ownership & Reviewers */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Project Ownership</h4>
                <div className="space-y-2">
                  <Label>MEP Estimation Owner</Label>
                  <Select value={formData.assignedTo} onValueChange={val => handleChange('assignedTo', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map(u => (
                        <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Project QS Owner</Label>
                  <Input value={formData.projectQsOwner} onChange={e => handleChange('projectQsOwner', e.target.value)} placeholder="Name of QS Owner" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Design Reviewers</h4>
                <div className="space-y-2">
                  <Label>MEP Design Reviewer</Label>
                  <Input value={formData.mepDesignReviewer} onChange={e => handleChange('mepDesignReviewer', e.target.value)} placeholder="Name of MEP Reviewer" />
                </div>
                <div className="space-y-2">
                  <Label>IT Design Reviewer</Label>
                  <Input value={formData.itDesignReviewer} onChange={e => handleChange('itDesignReviewer', e.target.value)} placeholder="Name of IT Reviewer" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Ruler className="h-3 w-3" /> Project Area (sq.ft.)</Label>
                <Input type="number" value={formData.areaSqFt} onChange={e => handleChange('areaSqFt', parseFloat(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Layers className="h-3 w-3" /> Total Levels</Label>
                <Input type="number" value={formData.levels} onChange={e => handleChange('levels', parseInt(e.target.value))} />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Project Specific Notes</Label>
              <Textarea 
                value={formData.notes} 
                onChange={e => handleChange('notes', e.target.value)} 
                placeholder="Enter project specific descriptions or important observations..."
                className="min-h-[100px]"
              />
            </div>

            <Separator />

            {/* Tasks */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Additional Tasks</h4>
              <div className="flex gap-2">
                <Input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="New task..." />
                <Button onClick={addTask} size="sm"><Plus className="h-4 w-4" /></Button>
              </div>
              <div className="space-y-2">
                {formData.tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg group">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleTask(task.id)}>
                        {task.isCompleted ? <CheckSquare className="h-5 w-5 text-green-600" /> : <Square className="h-5 w-5 text-muted-foreground" />}
                      </button>
                      <span className={task.isCompleted ? "line-through text-muted-foreground" : ""}>{task.title}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 text-destructive" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 border-t bg-muted/10">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-accent text-accent-foreground font-bold px-8">Update Project Details</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
