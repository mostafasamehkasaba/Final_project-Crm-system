export interface IInvoice {
  _id: string;
  invoiceNumber: string;
  customer_id: {
    _id: string;
    user_id: string;
    totalPrice: number;
    downPayment: number;
    notes?: string;
  } | null; // ✅ ممكن يكون null زي ما الـ API بترجع
  property_id: {
    _id: string;
    title: string;
    price: number;
  } | null; // ✅ ممكن يكون null
  installmentPlan_id: {
    _id: string;
    name: string;
    months: number;
    downPaymentPercentage: number;
  } | null;
  parentInvoice_id: string | null;
  installment_id: string | null;
  paymentType: "CASH" | "INSTALLMENT";
  basePrice: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: "PAID" | "PARTIAL" | "UNPAID" | "OVERDUE"; // ✅ أضفنا OVERDUE
  months?: number;
  monthlyAmount?: number;
  downPaymentPercentage?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}