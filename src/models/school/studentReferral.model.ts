import { ReferralReason } from "./referralReason.model";

export interface StudentReferral {
  studentId: string;
  referredBy: string;
  referralDate: string;
  referralType: string;
  reasons: ReferralReason[];
  detailedDescription: string;
  previousActions: string;
  supportingDocuments: any[]; // Puede ser archivos base64, URLs, etc.
}
