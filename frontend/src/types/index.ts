export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  member?: Member;
}

export interface Member {
  id: string;
  trainingNumber: string;
  membershipYear: number;
  trade: Trade;
  name: string;
  district: string;
  membershipNumber: string;
  address: string;
  mobile: string;
  nic: string;
  email?: string;
  paymentStatus: PaymentStatus;
  livingStatus: LivingStatus;
  userId?: string;
  isVerified: boolean; // ADD THIS
  createdAt: string;
  updatedAt: string;
}

export interface MemberFormData {
  trainingNumber: string;
  membershipYear: number;
  trade: Trade;
  name: string;
  district: string;
  membershipNumber: string;
  address: string;
  mobile: string;
  nic: string;
  email?: string;
  paymentStatus: PaymentStatus;
  livingStatus: LivingStatus;
  isVerified?: boolean; // ADD THIS
}
// Add these missing interfaces at the bottom of your types file:
export interface FilterOptions {
  search: string;
  trade: string;
  district: string;
  membershipYear: string;
  livingStatus: string;
  paymentStatus: string;
  isVerified: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export type District = 
  | 'Colombo' | 'Gampaha' | 'Kalutara'
  | 'Kandy' | 'Matale' | 'Nuwara Eliya'
  | 'Galle' | 'Matara' | 'Hambantota'
  | 'Jaffna' | 'Kilinochchi' | 'Mannar' | 'Vavuniya' | 'Mullaitivu'
  | 'Trincomalee' | 'Batticaloa' | 'Ampara'
  | 'Kurunegala' | 'Puttalam'
  | 'Anuradhapura' | 'Polonnaruwa'
  | 'Badulla' | 'Monaragala'
  | 'Ratnapura' | 'Kegalle'

export type Trade = 
  | 'TOOL_MACHINE'
  | 'MILLWRIGHT'
  | 'AUTO_MOBILE'
  | 'BBP'
  | 'AUTO_ELECTRICAL'
  | 'REF_AND_AC'
  | 'MECHATRONIC'
  | 'DISAL_PUMP'
  | 'WELDING'
  | 'POWER_ELECTRICAL';

export type PaymentStatus = 'PAID' | 'NON_PAID';
export type LivingStatus = 'ALIVE' | 'DECEASED';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: 'ADMIN' | 'MEMBER';
  memberData?: Partial<Member>;
}


export interface LetterTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedLetter {
  id: string;
  memberId: string;
  templateId: string;
  content: string;
  subject: string;
  reason: string;
  generatedBy: string;
  createdAt: string;
  member: Member;
  template: LetterTemplate;
}

export interface LetterFormData {
  templateId?: string;
  subject: string;
  content: string;
  reason: string;
  isCustom: boolean;
  selectedMemberIds: string[];
}

export interface LetterData {
  member: Member;
  reason: string;
  generatedDate: string;
  currentDate: string;
}

// Add these interfaces to your existing types
export interface EventRegistration {
  id: string;
  eventId: string;
  memberId: string;
  status: RegistrationStatus;
  ticketNumber?: string;
  notes?: string;
  paymentStatus: PaymentStatus;
  paymentAmount?: number;
  paymentMethod?: string;
  paymentDate?: string;
  paymentReference?: string;
  checkInTime?: string;
  checkOutTime?: string;
  guests: number;
  dietaryRequirements?: string;
  specialRequests?: string;
  registrationDate: string;
  createdAt: string;
  updatedAt: string;
  event?: Event;
  member?: Member;
}

export interface RegistrationFormData {
  eventId: string;
  memberId: string;
  guests?: number;
  notes?: string;
  dietaryRequirements?: string;
  specialRequests?: string;
}

export interface RegistrationStatistics {
  totalRegistrations: number;
  confirmedRegistrations: number;
  waitlisted: number;
  attended: number;
  pendingPayments: number;
  totalRevenue: number;
  capacity: number;
  remainingCapacity: number;
  attendanceRate: number;
  paidEvent: boolean;
  ticketPrice: number;
}

// Add to existing enums
export enum RegistrationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  WAITLISTED = 'WAITLISTED',
  CANCELLED = 'CANCELLED',
  ATTENDED = 'ATTENDED',
  NO_SHOW = 'NO_SHOW'
}

export enum RegistrationType {
  FREE = 'FREE',
  PAID = 'PAID',
  INVITE_ONLY = 'INVITE_ONLY'
}
// Add this to your types.ts file
export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  city: string;
  country: string;
  eventType: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
  category: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
  visibility: 'PUBLIC' | 'PRIVATE' | 'ALUMNI_ONLY';
  registrationType: 'FREE' | 'PAID' | 'INVITE_ONLY';
  price?: number;
  currency: string;
  capacity: number;
  waitlistEnabled: boolean;
  registrationDeadline?: string;
  coverImage?: string;
  galleryImages?: string[];
  organizerName: string;
  organizerEmail: string;
  organizerPhone?: string;
  agenda?: AgendaItem[];
  speakers?: Speaker[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

export interface Speaker {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}