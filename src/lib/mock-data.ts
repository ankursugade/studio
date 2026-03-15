
import { Project, User, QSStage } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Thompson', role: 'Lead Estimator', avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: 'u2', name: 'Sarah Miller', role: 'Senior QS', avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: 'u3', name: 'David Chen', role: 'Junior QS', avatar: 'https://picsum.photos/seed/user3/100/100' },
  { id: 'u4', name: 'James Wilson', role: 'Commercial Manager', avatar: 'https://picsum.photos/seed/user4/100/100' },
];

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', title: 'Grand Plaza HVAC', client: 'BuildCorp', assignedTo: 'u1', currentStage: 'Inquiry', updatedAt: new Date(), value: 450000 },
  { id: 'p2', title: 'City Hospital Electrical', client: 'HealthState', assignedTo: 'u2', currentStage: 'Take-off', updatedAt: new Date(), value: 1200000 },
  { id: 'p3', title: 'Metro Station Plumbing', client: 'TransportLink', assignedTo: 'u1', currentStage: 'Estimation', updatedAt: new Date(), value: 350000 },
  { id: 'p4', title: 'Data Center Fire Pro', client: 'SecureServe', assignedTo: 'u3', currentStage: 'Review', updatedAt: new Date(), value: 890000 },
  { id: 'p5', title: 'Luxury Hotel Lighting', client: 'GlobalStay', assignedTo: 'u2', currentStage: 'Tender Submission', updatedAt: new Date(), value: 550000 },
  { id: 'p6', title: 'Industrial Park Power', client: 'EnergyGrid', assignedTo: 'u4', currentStage: 'Post-Tender', updatedAt: new Date(), value: 2100000 },
  { id: 'p7', title: 'Airport Terminal B MEP', client: 'AirwaysHub', assignedTo: 'u1', currentStage: 'Inquiry', updatedAt: new Date(), value: 3400000 },
];
