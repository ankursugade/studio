
export type QSStage = 
  | 'Inquiry'
  | 'Take-off'
  | 'Estimation'
  | 'Review'
  | 'Tender Submission'
  | 'Post-Tender';

export const QS_STAGES: QSStage[] = [
  'Inquiry',
  'Take-off',
  'Estimation',
  'Review',
  'Tender Submission',
  'Post-Tender'
];

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  assignedTo: string; // User ID
  currentStage: QSStage;
  updatedAt: Date;
  value?: number;
}

export interface Revision {
  id: string;
  projectId: string;
  fromStage: QSStage;
  toStage: QSStage;
  reason: string;
  userId: string;
  timestamp: Date;
}
