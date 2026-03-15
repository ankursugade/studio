
"use client";

import { useState, useEffect } from 'react';
import { Project, User, Revision, QSStage, QS_STAGES } from '@/lib/types';
import { MOCK_PROJECTS, MOCK_USERS } from '@/lib/mock-data';

export function useQSStore() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('qs_flow_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
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
      currentStage: 'Inquiry',
      updatedAt: new Date(),
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProjectStage = (projectId: string, toStage: QSStage, reason?: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const fromStage = p.currentStage;
        
        // Log revision if moving backward
        const fromIndex = QS_STAGES.indexOf(fromStage);
        const toIndex = QS_STAGES.indexOf(toStage);
        
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

  return {
    currentUser,
    projects,
    revisions,
    isInitialized,
    login,
    logout,
    addProject,
    updateProjectStage,
    users: MOCK_USERS
  };
}
