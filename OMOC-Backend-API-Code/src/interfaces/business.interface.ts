export interface IBusinessInfo {
  userId: string;
  name: string;
  country?: string;
  categories?: string;
  email?: string;
  logo: string;
  isVerified?: boolean;
  isAlreadySelling?: boolean;
  taxId?: string;
  companyName?: string;
}
