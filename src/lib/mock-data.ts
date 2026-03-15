
import { Project, User } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Thompson', role: 'Lead Estimator', avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: 'u2', name: 'Sarah Miller', role: 'Senior QS', avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: 'u3', name: 'David Chen', role: 'Junior QS', avatar: 'https://picsum.photos/seed/user3/100/100' },
  { id: 'admin1', name: 'James Wilson', role: 'Commercial Manager', avatar: 'https://picsum.photos/seed/admin/100/100', isAdmin: true },
];

export const MOCK_PROJECTS: Project[] = [
  { 
    id: 'p1', 
    title: 'Grand Plaza HVAC', 
    client: 'BuildCorp', 
    assignedTo: 'u1', 
    currentStage: 'inquiry', 
    status: 'active',
    updatedAt: new Date(), 
    value: 450000,
    mainCategory: 'Interior fit out',
    subCategory: 'Office',
    contractType: 'Lumsum',
    pricingModel: 'Close Book',
    mepDesignReviewer: 'John Doe',
    itDesignReviewer: 'Jane Smith',
    projectQsOwner: 'Wilson James',
    areaSqFt: 15000,
    levels: 3,
    notes: 'Urgent priority for Q3.',
    tasks: [],
    logs: []
  },
  { 
    id: 'p2', 
    title: 'City Hospital Electrical', 
    client: 'HealthState', 
    assignedTo: 'u2', 
    currentStage: 'take-off', 
    status: 'active',
    updatedAt: new Date(), 
    value: 1200000,
    mainCategory: 'Interior + Base build',
    subCategory: 'Lab Only',
    contractType: 'Measurable',
    pricingModel: 'Open Book',
    mepDesignReviewer: 'Mike Ross',
    itDesignReviewer: 'Rachel Zane',
    projectQsOwner: 'Harvey Specter',
    areaSqFt: 50000,
    levels: 5,
    notes: 'Medical grade certification required.',
    tasks: [],
    logs: []
  }
];
