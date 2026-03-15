
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
    if (savedStages) setStages(JSON.parse(savedStages));
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      setProjects(parsed.map((p: any) => ({ 
        ...p, 
        updatedAt: new Date(p.updatedAt),
        logs: p.logs?.map((l: any) => ({ ...l, timestamp: new Date(l.timestamp) })) || []
      })));
    }
    if (savedRevisions) {
      const parsed = JSON.parse(savedRevisions);
      setRevisions(parsed.map((r: any) => ({ ...r, timestamp: new Date(r.timestamp) })));
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('qs_flow_projects', JSON.stringify(projects));
      localStorage.setItem('qs_flow_revisions', JSON.stringify(revisions));
    }
  }, [projects, revisions, isInitialized]);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('qs_flow_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('qs_flow_user');
  };

  const addProject = (projectData: Omit<Project, 'id' | 'updatedAt' | 'currentStage' | 'logs'>) => {
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      currentStage: stages[0]?.id || 'inquiry',
      updatedAt: new Date(),
      logs: [],
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, ...updates, updatedAt: new Date() } : p
    ));
  };

  const addProjectLog = (projectId: string, message: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newLog: ProjectLogEntry = {
          id: Math.random().toString(36).substr(2, 9),
          userId: currentUser?.id || 'unknown',
          message,
          timestamp: new Date()
        };
        return { ...p, logs: [newLog, ...(p.logs || [])], updatedAt: new Date() };
      }
      return p;
    }));
  };

  const updateProjectStage = (projectId: string, toStageId: string, reason?: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const fromStageId = p.currentStage;
        
        const fromIndex = stages.findIndex(s => s.id === fromStageId);
        const toIndex = stages.findIndex(s => s.id === toStageId);
        
        if (toIndex < fromIndex && reason) {
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

        return { ...p, currentStage: toStageId, updatedAt: new Date() };
      }
      return p;
    }));
  };

  const updateStages = (newStages: QSStage[]) => {
    setStages(newStages);
    localStorage.setItem('qs_flow_stages', JSON.stringify(newStages));
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
    addProjectLog,
    updateProjectStage,
    updateStages,
    users: MOCK_USERS
  };
}
