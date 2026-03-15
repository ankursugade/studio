
"use client";

import { useState, useEffect } from 'react';
import { Project, User, Revision, QSStage, INITIAL_QS_STAGES } from '@/lib/types';
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
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedStages) {
      setStages(JSON.parse(savedStages));
    }
    setIsInitialized(true);
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('qs_flow_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('qs_flow_user');
  };

  const addProject = (projectData: Omit<Project, 'id' | 'updatedAt' | 'currentStage'>) => {
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      currentStage: stages[0] || 'Inquiry',
      updatedAt: new Date(),
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProjectStage = (projectId: string, toStage: QSStage, reason?: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const fromStage = p.currentStage;
        
        const fromIndex = stages.indexOf(fromStage);
        const toIndex = stages.indexOf(toStage);
        
        if (toIndex < fromIndex && reason) {
          const newRevision: Revision = {
            id: Math.random().toString(36).substr(2, 9),
            projectId,
            fromStage,
            toStage,
            reason,
            userId: currentUser?.id || 'unknown',
            timestamp: new Date()
          };
          setRevisions(revs => [newRevision, ...revs]);
        }

        return { ...p, currentStage: toStage, updatedAt: new Date() };
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
    updateProjectStage,
    updateStages,
    users: MOCK_USERS
  };
}
