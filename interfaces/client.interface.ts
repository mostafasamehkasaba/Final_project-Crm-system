export type ClientFilterTab = "all" | "debt";

export type InstallmentStatus = "PENDING" | "PAID";

export interface Installment {
  _id: string;
  amount: number;
  dueDate: string;
  status: InstallmentStatus;
  paidAt: string | null;
}

export interface InstallmentInput {
  amount: number;
  dueDate: string;
  status: InstallmentStatus;
  paidAt: string | null;
}

export interface ClientUser {
  _id: string;
  name: string;
  email: string;
}

export interface ClientProperty {
  _id: string;
  title: string;
  price: number;
}

export interface Client {
  _id: string;
  user_id: ClientUser | null;
  property_id: ClientProperty | null;
  totalPrice: number;
  downPayment: number;
  notes?: string;
  installments: Installment[];
  createdAt: string;
  updatedAt: string;
}

export interface ClientFormState {
  user_id: string;
  property_id: string;
  totalPrice: string;
  downPayment: string;
  notes: string;
}

export const EMPTY_CLIENT_FORM: ClientFormState = {
  user_id: "",
  property_id: "",
  totalPrice: "",
  downPayment: "0",
  notes: "",
};