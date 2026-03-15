
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Project, ProjectMainCategory, ProjectSubCategory, ContractType, PricingModel } from "@/lib/types";
import { Plus, Calculator } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface NewProjectModalProps {
  users: User[];
  onAdd: (project: Omit<Project, 'id' | 'updatedAt' | 'currentStage'>) => void;
}

export function NewProjectModal({ users, onAdd }: NewProjectModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    assignedTo: "",
    value: "",
    mainCategory: "Interior fit out" as ProjectMainCategory,
    subCategory: "Office" as ProjectSubCategory,
    contractType: "Lumsum" as ContractType,
    pricingModel: "Close Book" as PricingModel,
    mepDesignReviewer: "",
    itDesignReviewer: "",
    projectQsOwner: "",
    areaSqFt: "",
    levels: "1",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title: formData.title,
      client: formData.client,
      assignedTo: formData.assignedTo,
      value: formData.value ? parseFloat(formData.value) : undefined,
      mainCategory: formData.mainCategory,
      subCategory: formData.subCategory,
      contractType: formData.contractType,
      pricingModel: formData.pricingModel,
      mepDesignReviewer: formData.mepDesignReviewer,
      itDesignReviewer: formData.itDesignReviewer,
      projectQsOwner: formData.projectQsOwner,
      areaSqFt: formData.areaSqFt ? parseFloat(formData.areaSqFt) : 0,
      levels: formData.levels ? parseInt(formData.levels) : 1,
      notes: formData.notes,
      tasks: [],
    });
    setOpen(false);
    // Reset form
    setFormData({
      title: "",
      client: "",
      assignedTo: "",
      value: "",
      mainCategory: "Interior fit out",
      subCategory: "Office",
      contractType: "Lumsum",
      pricingModel: "Close Book",
      mepDesignReviewer: "",
      itDesignReviewer: "",
      projectQsOwner: "",
      areaSqFt: "",
      levels: "1",
      notes: "",
    });
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col p-0 overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-accent" />
              Initialize New Project
            </DialogTitle>
            <DialogDescription>
              Provide initial parameters for the MEP Quantity Surveying project.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" value={formData.title} onChange={e => updateField('title', e.target.value)} placeholder="e.g. Grand Plaza HVAC" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input id="client" value={formData.client} onChange={e => updateField('client', e.target.value)} placeholder="e.g. BuildCorp" required />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <Select value={formData.mainCategory} onValueChange={val => updateField('mainCategory', val)}>
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
                  <Select value={formData.subCategory} onValueChange={val => updateField('subCategory', val)}>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contract Type</Label>
                  <Select value={formData.contractType} onValueChange={val => updateField('contractType', val)}>
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
                  <Select value={formData.pricingModel} onValueChange={val => updateField('pricingModel', val)}>
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

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">MEP Estimation Owner</Label>
                  <Select value={formData.assignedTo} onValueChange={val => updateField('assignedTo', val)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Owner" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Estimated Value ($)</Label>
                  <Input id="value" type="number" value={formData.value} onChange={e => updateField('value', e.target.value)} placeholder="0.00" />
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-6 border-t bg-muted/20">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-bold px-8">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
