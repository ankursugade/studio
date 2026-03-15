
export interface QSStage {
  id: string;
  name: string;
  description: string;
}

export const INITIAL_QS_STAGES: QSStage[] = [
  { id: 'inquiry', name: 'Inquiry', description: 'Initial project receipt and scope review.' },
  { id: 'take-off', name: 'Take-off', description: 'Quantifying materials from drawings and specs.' },
  { id: 'estimation', name: 'Estimation', description: 'Applying rates and calculating total costs.' },
  { id: 'review', name: 'Review', description: 'Internal peer review and margin adjustment.' },
  { id: 'tender-submission', name: 'Tender Submission', description: 'Final bid documents sent to the client.' },
  { id: 'post-tender', name: 'Post-Tender', description: 'Negotiations and project award phase.' }
];

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isAdmin?: boolean;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  assignedTo: string; // User ID
  currentStage: string; // References QSStage.id
  updatedAt: Date;
  value?: number;
}

export interface Revision {
  id: string;
  projectId: string;
  fromStage: string; // Stage ID
  toStage: string;   // Stage ID
  reason: string;
  userId: string;
  timestamp: Date;
}
