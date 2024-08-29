export interface IUserAddress {
  userId: string;
  name: string;
  address: string;
  region?: string;
  phoneNumber?: string;
  city: string;
  zipCode: string;
  country: string;
  isActive: boolean;
  isPrimary: boolean;
  icon: string;
  lat?: string;
  long?: string;
}

export interface IWareHouses {
  businessId: string;
  name: string;
  address: string;
  region: string;
  city: string;
  zipCode: string;
  country: string;
  isActive: boolean;
  lat?: string;
  long?: string;
}

export interface IBusinessLocations extends IWareHouses {}
