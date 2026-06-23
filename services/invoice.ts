import { IInvoice } from "@/interfaces/invoice";

const BASE_URL = "https://back-end-crm-project.vercel.app/api/invoices";

// 1. تعريف الـ Interface الخاص بالبيانات المرسلة لإنشاء الفاتورة (بديل any)
export interface ICreateInvoiceBody {
    customer_id: string;
    property_id: string;
    paymentType: "CASH" | "INSTALLMENT";
    installmentPlan_id: string | null;
    basePrice: number;
    discount?: number;
    tax?: number;
}

// 2. جلب كل الفواتير (GET)
export const getAllInvoices = async (token: string) => {
    try {
        const res = await fetch(`${BASE_URL}/getAllInvoices`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in getAllInvoices:", error);
        throw error;
    }
};

// 3. إنشاء فاتورة جديدة بـ Type صريح ومحمي (POST)
export const createInvoice = async (invoiceData: ICreateInvoiceBody, token: string) => {
    try {
        const response = await fetch(`${BASE_URL}`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(invoiceData), // الـ TypeScript هيراقب الـ Object هنا بدقة
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "حدث خطأ أثناء إنشاء الفاتورة");
        }
        
        return data;
    } catch (error) {
        console.error("Error in createInvoice:", error);
        throw error;
    }
};

// 4. تحديث فاتورة (PATCH)
export const updateInvoice = async (id: string, body: Partial<IInvoice>, token: string) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in updateInvoice:", error);
        throw error;
    }
};

// 5. حذف فاتورة (DELETE)
export const deleteInvoice = async (id: string, token: string) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in deleteInvoice:", error);
        throw error;
    }
};