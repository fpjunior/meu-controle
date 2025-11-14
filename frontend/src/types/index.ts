export interface User {
  id: string;
  email: string;
  name: string;
}

export interface RM {
  id: string;
  rmNumber: string;
  description: string;
  observations?: string;
  implementationDate?: string;
  branchName?: string;
  status: 'pending' | 'in-progress' | 'implanted' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
}

export interface Branch {
  id: string;
  name: string;
  rmNumber?: string;
  purpose?: string;
  createdDate: string;
  status: 'active' | 'merged' | 'deleted';
}

export interface TeamsMessage {
  id: string;
  title: string;
  content: string;
  classification: 'fundamental' | 'important' | 'normal';
  date: string;
}

export interface AccessInfo {
  id: string;
  name: string;
  description?: string;
  key?: string;
  username?: string;
  password?: string;
  url?: string;
  notes?: string;
}

export interface Daily {
  id: string;
  title: string;
  description?: string;
  link: string;
  schedule?: string;
  scrumMaster?: string;
  participants: DailyParticipant[];
}

export interface DailyParticipant {
  id: string;
  name: string;
}

export interface ImportantLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  category?: string;
}
