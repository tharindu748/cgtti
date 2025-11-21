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