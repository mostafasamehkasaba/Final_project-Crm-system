export interface AddressPayload {
  country: string;
  city: string;
  street: string;
}
export interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
export interface UpdateProfilePayload {
  name?: string;
  address?: AddressPayload;
}
export interface ProfileResponse {
  message: string;
  user: User;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isConfirmEmail: boolean;
  profileImage?: ProfileImage;
  address?: Address;
  createdAt: string;
  updatedAt: string;
}
export interface ProfileImage {
  secure_url: string;
  public_id: string;
}

export interface Address {
  country: string;
  city: string;
  street: string;
  building?: string;
}
