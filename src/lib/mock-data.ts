
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
    title: 'Grand Plaza HVAC Upgrade', 
    client: 'BuildCorp', 
    assignedTo: 'u1', 
    currentStage: 'estimation', 
    status: 'active',
    updatedAt: new Date(Date.now() - 3600000 * 2), 
    value: 450000,
    mainCategory: 'Interior fit out',
    subCategory: 'Office',
    contractType: 'Lumsum',
    pricingModel: 'Close Book',
    mepDesignReviewer: 'Michael Scott',
    itDesignReviewer: 'Dwight Schrute',
    projectQsOwner: 'Jim Halpert',
    areaSqFt: 15000,
    levels: 3,
    notes: 'Urgent priority for Q4. Focus on chiller efficiency.',
    tasks: [
      { id: 't1', title: 'Review equipment schedule', isCompleted: true },
      { id: 't2', title: 'Obtain quotes from suppliers', isCompleted: false }
    ],
    logs: [
      { id: 'l1', userId: 'u1', message: 'Project initialized', timestamp: new Date(Date.now() - 86400000 * 2) },
      { id: 'l2', userId: 'u1', message: 'Moved from Take-off to Estimation', timestamp: new Date(Date.now() - 3600000 * 2) }
    ]
  },
  { 
    id: 'p2', 
    title: 'City Hospital Electrical Ph2', 
    client: 'HealthState', 
    assignedTo: 'u2', 
    currentStage: 'take-off', 
    status: 'active',
    updatedAt: new Date(Date.now() - 3600000 * 5), 
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
    notes: 'Medical grade certification required for all switchgear.',
    tasks: [
      { id: 't3', title: 'Draft initial BoQ', isCompleted: false },
      { id: 't4', title: 'Coordinate with lead architect', isCompleted: false }
    ],
    logs: [
      { id: 'l3', userId: 'u2', message: 'Take-off started for sub-station B', timestamp: new Date(Date.now() - 3600000 * 5) }
    ]
  },
  { 
    id: 'p3', 
    title: 'BioLabs Research Center', 
    client: 'BioPharma Corp', 
    assignedTo: 'u3', 
    currentStage: 'review', 
    status: 'active',
    updatedAt: new Date(), 
    value: 850000,
    mainCategory: 'Refurbishment',
    subCategory: 'Office + Lab',
    contractType: 'Lumsum',
    pricingModel: 'Close Book',
    mepDesignReviewer: 'Walter White',
    itDesignReviewer: 'Jesse Pinkman',
    projectQsOwner: 'Saul Goodman',
    areaSqFt: 12500,
    levels: 1,
    notes: 'High specification laboratory ventilation requirements.',
    tasks: [
      { id: 't5', title: 'Internal peer review', isCompleted: true },
      { id: 't6', title: 'Margin adjustment approval', isCompleted: false }
    ],
    logs: [
      { id: 'l4', userId: 'u3', message: 'Estimation complete', timestamp: new Date(Date.now() - 86400000) },
      { id: 'l5', userId: 'u3', message: 'Moved to Review stage', timestamp: new Date() }
    ]
  },
  { 
    id: 'p4', 
    title: 'Skyline Office Tower', 
    client: 'Apex Properties', 
    assignedTo: 'u1', 
    currentStage: 'post-tender', 
    status: 'won',
    updatedAt: new Date(Date.now() - 86400000 * 3), 
    value: 4200000,
    mainCategory: 'Interior + Base build',
    subCategory: 'Office',
    contractType: 'Measurable',
    pricingModel: 'Open Book',
    mepDesignReviewer: 'Tony Stark',
    itDesignReviewer: 'Bruce Banner',
    projectQsOwner: 'Steve Rogers',
    areaSqFt: 180000,
    levels: 22,
    notes: 'Full MEP scope for new commercial headquarters.',
    tasks: [],
    logs: [
      { id: 'l6', userId: 'u1', message: 'Tender submitted successfully', timestamp: new Date(Date.now() - 86400000 * 10) },
      { id: 'l7', userId: 'admin1', message: 'Status changed to WON', timestamp: new Date(Date.now() - 86400000 * 3) }
    ]
  },
  { 
    id: 'p5', 
    title: 'Metro Rail MEP Sub-contracts', 
    client: 'GovTransit', 
    assignedTo: 'u2', 
    currentStage: 'tender-submission', 
    status: 'lost',
    updatedAt: new Date(Date.now() - 86400000 * 5), 
    value: 2750000,
    mainCategory: 'Refurbishment',
    subCategory: 'Office',
    contractType: 'Lumsum',
    pricingModel: 'Close Book',
    mepDesignReviewer: 'Marcus Wright',
    itDesignReviewer: 'Kyle Reese',
    projectQsOwner: 'John Connor',
    areaSqFt: 35000,
    levels: 2,
    notes: 'Highly competitive bid process.',
    tasks: [],
    logs: [
      { id: 'l8', userId: 'u2', message: 'Project finalized for submission', timestamp: new Date(Date.now() - 86400000 * 7) },
      { id: 'l9', userId: 'admin1', message: 'Status changed to LOST', timestamp: new Date(Date.now() - 86400000 * 5) }
    ]
  },
  { 
    id: 'p6', 
    title: 'University Library MEP', 
    client: 'UniEdu', 
    assignedTo: 'u3', 
    currentStage: 'inquiry', 
    status: 'active',
    updatedAt: new Date(), 
    value: 300000,
    mainCategory: 'Refurbishment',
    subCategory: 'Office',
    contractType: 'Lumsum',
    pricingModel: 'Close Book',
    mepDesignReviewer: 'Albus Dumbledore',
    itDesignReviewer: 'Minerva McGonagall',
    projectQsOwner: 'Severus Snape',
    areaSqFt: 8000,
    levels: 2,
    notes: 'Initial scope review pending.',
    tasks: [
      { id: 't7', title: 'Verify site measurements', isCompleted: false }
    ],
    logs: [
      { id: 'l10', userId: 'u3', message: 'Project inquiry received', timestamp: new Date() }
    ]
  }
];
