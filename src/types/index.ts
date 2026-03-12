export type UserRole = 'entrepreneur' | 'investor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  bio: string;
  isOnline?: boolean;
  createdAt: string;
}

export interface Entrepreneur extends User {
  role: 'entrepreneur';
  startupName: string;
  pitchSummary: string;
  fundingNeeded: string;
  industry: string;
  location: string;
  foundedYear: number;
  teamSize: number;
}

export interface Investor extends User {
  role: 'investor';
  investmentInterests: string[];
  investmentStage: string[];
  portfolioCompanies: string[];
  totalInvestments: number;
  minimumInvestment: string;
  maximumInvestment: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}

export interface CollaborationRequest {
  id: string;
  investorId: string;
  entrepreneurId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  shared: boolean;
  url: string;
  ownerId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;

  pendingUser: User | null;
  verify2FA: (otp: string) => Promise<void>;
}

// ---------- new ----------

// ---------- Meeting Context Type ----------

export interface Meeting {
  id: string;
  title: string;
  entrepreneurName: string;
  investorName: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'accepted' | 'declined';
  isInvestorJoined: boolean;
}

export interface MeetingContextType {
  meetings: Meeting[];
  bookMeeting: (meeting: Omit<Meeting, 'id' | 'status'>) => void;
  updateMeetingStatus: (id: string, status: 'accepted' | 'declined') => void;
  joinMeeting: (id: string) => void;
}

// ---------- Document Context Type ----------

export interface DocumentContextType {
  documents: Document[];
  uploadDocument: (file: File, role: string) => void;
  deleteDocument: (id: string) => void;
  signDocument: (id: string, signatureData: string) => void;
}

// ---------- Payment Context Type ----------

export interface Transaction {
  id: string;
  amount: number;
  sender: string;
  receiver: string;
  type: 'Deposit' | 'Withdraw' | 'Funding';
  status: 'Completed' | 'Pending';
  date: string;
}

export interface Bill {
  id: string;
  title: string;
  amount: number;
  status: 'Unpaid' | 'Paid';
  date: string;
}

export interface PaymentContextType {
  investorBalance: number;
  entrepreneurBalance: number;
  transactions: Transaction[];
  bills: Bill[];
  // Actions
  deposit: (amount: number, role: 'investor' | 'entrepreneur') => void;
  withdraw: (amount: number, role: 'investor' | 'entrepreneur') => void;
  createBill: (amount: number, title: string) => void;
  payBill: (billId: string) => void;
}

