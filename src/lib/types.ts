
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

export interface ProjectTask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface ProjectLogEntry {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
}

export type ProjectMainCategory = 'Interior fit out' | 'Interior + Base build' | 'Refurbishment';
export type ProjectSubCategory = 'Office' | 'Office + Lab' | 'Lab Only';
export type ContractType = 'Lumsum' | 'Measurable';
export type PricingModel = 'Close Book' | 'Open Book';

export interface Project {
  id: string;
  title: string;
  client: string;
  assignedTo: string; // MEP Estimation Owner
  currentStage: string; // References QSStage.id
  updatedAt: Date;
  value?: number;
  
  // New detailed parameters
  mainCategory: ProjectMainCategory;
  subCategory: ProjectSubCategory;
  contractType: ContractType;
  pricingModel: PricingModel;
  
  mepDesignReviewer: string;
  itDesignReviewer: string;
  projectQsOwner: string;
  areaSqFt: number;
  levels: number;
  notes: string;
  tasks: ProjectTask[];
  logs: ProjectLogEntry[];
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
