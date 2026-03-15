
"use client";

import { useState, useEffect } from 'react';
import { Project, User, Revision, QSStage, INITIAL_QS_STAGES, ProjectLogEntry } from '@/lib/types';
import { MOCK_PROJECTS, MOCK_USERS } from '@/lib/mock-data';

export function useQSStore() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [stages, setStages] = useState<QSStage[]>(INITIAL_QS_STAGES);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('qs_flow_user');
    const savedStages = localStorage.getItem('qs_flow_stages');
    const savedProjects = localStorage.getItem('qs_flow_projects');
    const savedRevisions = localStorage.getItem('qs_flow_revisions');

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedStages) {
      const parsedStages = JSON.parse(savedStages);
      if (parsedStages && parsedStages.length > 0) {
        setStages(parsedStages);
      }
    }
    
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      if (parsed && Array.isArray(parsed) && parsed.length > 0) {
        setProjects(parsed.map((p: any) => ({ 
          ...p, 
          updatedAt: new Date(p.updatedAt),
          logs: p.logs?.map((l: any) => ({ ...l, timestamp: new Date(l.timestamp) })) || []
        })));
      } else {
        // If stored projects is empty, use MOCK_PROJECTS
        setProjects(MOCK_PROJECTS);
      }
    }
    
    if (savedRevisions) {
      const parsed = JSON.parse(savedRevisions);
      if (parsed && Array.isArray(parsed)) {
        setRevisions(parsed.map((r: any) => ({ ...r, timestamp: new Date(r.timestamp) })));
      }
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('qs_flow_projects', JSON.stringify(projects));
      localStorage.setItem('qs_flow_revisions', JSON.stringify(revisions));
      localStorage.setItem('qs_flow_stages', JSON.stringify(stages));
    }
  }, [projects, revisions, stages, isInitialized]);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('qs_flow_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('qs_flow_user');
  };

  const addProject = (projectData: Omit<Project, 'id' | 'updatedAt' | 'currentStage' | 'logs' | 'status'>) => {
    const initialLog: ProjectLogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser?.id || 'unknown',
      message: "Project initialized and added to workflow",
      timestamp: new Date()
    };
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      currentStage: stages[0]?.id || 'inquiry',
      status: 'active',
      updatedAt: new Date(),
      logs: [initialLog],
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newLogs = [...(p.logs || [])];
        const logMessages: string[] = [];

        if (updates.status && updates.status !== p.status) {
          logMessages.push(`Status changed to ${updates.status.toUpperCase()}`);
        }
        if (updates.title && updates.title !== p.title) logMessages.push(`Title updated to "${updates.title}"`);
        if (updates.client && updates.client !== p.client) logMessages.push(`Client updated to "${updates.client}"`);
        if (updates.areaSqFt !== undefined && updates.areaSqFt !== p.areaSqFt) logMessages.push(`Area updated to ${updates.areaSqFt} sq.ft.`);
        if (updates.assignedTo && updates.assignedTo !== p.assignedTo) {
          const newUser = MOCK_USERS.find(u => u.id === updates.assignedTo)?.name || 'New User';
          logMessages.push(`Reassigned to ${newUser}`);
        }
        
        if (updates.tasks) {
          const oldTasks = p.tasks || [];
          const newTasks = updates.tasks || [];
          
          newTasks.forEach(nt => {
            const ot = oldTasks.find(t => t.id === nt.id);
            if (!ot) {
              logMessages.push(`New task created: "${nt.title}"`);
            } else {
              if (nt.isCompleted && !ot.isCompleted) logMessages.push(`Task completed: "${nt.title}"`);
              if (!nt.isCompleted && ot.isCompleted) logMessages.push(`Task reopened: "${nt.title}"`);
            }
          });

          oldTasks.forEach(ot => {
            if (!newTasks.some(nt => nt.id === ot.id)) {
              logMessages.push(`Task removed: "${ot.title}"`);
            }
          });
        }

        if (logMessages.length === 0 && Object.keys(updates).length > 0) {
          logMessages.push("Project parameters updated");
        }

        logMessages.reverse().forEach(msg => {
          newLogs.unshift({
            id: Math.random().toString(36).substr(2, 9),
            userId: currentUser?.id || 'unknown',
            message: msg,
            timestamp: new Date()
          });
        });

        return { ...p, ...updates, logs: newLogs, updatedAt: new Date() };
      }
      return p;
    }));
  };

  const updateProjectStage = (projectId: string, toStageId: string, reason?: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const fromStageId = p.currentStage;
        const fromStageName = stages.find(s => s.id === fromStageId)?.name || fromStageId;
        const toStageName = stages.find(s => s.id === toStageId)?.name || toStageId;
        
        const fromIndex = stages.findIndex(s => s.id === fromStageId);
        const toIndex = stages.findIndex(s => s.id === toStageId);
        
        const newLogs = [...(p.logs || [])];
        const logMsg = `Stage changed from "${fromStageName}" to "${toStageName}"${reason ? ` (Revision Reason: ${reason})` : ''}`;
        
        newLogs.unshift({
          id: Math.random().toString(36).substr(2, 9),
          userId: currentUser?.id || 'unknown',
          message: logMsg,
          timestamp: new Date()
        });

        if (fromIndex !== -1 && toIndex !== -1 && toIndex < fromIndex && reason) {
          const newRevision: Revision = {
            id: Math.random().toString(36).substr(2, 9),
            projectId,
            fromStage: fromStageId,
            toStage: toStageId,
            reason,
            userId: currentUser?.id || 'unknown',
            timestamp: new Date()
          };
          setRevisions(revs => [newRevision, ...revs]);
        }

        return { ...p, currentStage: toStageId, logs: newLogs, updatedAt: new Date() };
      }
      return p;
    }));
  };

  const updateStages = (newStages: QSStage[]) => {
    setStages(newStages);
  };

  return {
    currentUser,
    projects,
    revisions,
    stages,
    isInitialized,
    login,
    logout,
    addProject,
    updateProject,
    updateProjectStage,
    updateStages,
    users: MOCK_USERS
  };
}
