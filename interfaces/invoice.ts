
export interface IInvoice {
  _id: string;
  invoiceNumber: string;
  customer_id: {
    _id: string;
    user_id: string;
    totalPrice: number;
  };
  property_id: {
    _id: string;
    title: string;
    price: number;
  };
  paymentType: "CASH" | "INSTALLMENT";
  basePrice: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: "PAID" | "PARTIAL" | "UNPAID";
  months?: number;
  monthlyAmount?: number;
  notes?: string;
  createdAt: string;
}