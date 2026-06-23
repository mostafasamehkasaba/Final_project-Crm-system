"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAllInvoices } from '@/services/invoice';
import { IInvoice } from '@/interfaces/invoice';

interface InvoiceContextType {
  invoices: IInvoice[];
  loading: boolean;
  fetchInvoices: () => Promise<void>;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. خلينا الـ fetchInvoices دالة خارجية نقدر ننده عليها يدوياً عند الحاجة (مثلا بعد مسح أو إضافة فاتورة)
  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return;

      const response = await getAllInvoices(token);
      if (response && Array.isArray(response)) {
        setInvoices(response as IInvoice[]);
      } else if (response && response.data && Array.isArray(response.data)) {
        setInvoices(response.data as IInvoice[]);
      }
    } catch (error) {
      console.error("Failed to load invoices manually:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true; // لمنع تحديث الحالة لو الكومبوننت اتعمله unmount في النص

    const loadInitialData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
          if (isMounted) setLoading(false);
          return;
        }

        const response = await getAllInvoices(token);
        
        if (isMounted) {
          if (response && Array.isArray(response)) {
            setInvoices(response as IInvoice[]);
          } else if (response && response.data && Array.isArray(response.data)) {
            setInvoices(response.data as IInvoice[]);
          }
        }
      } catch (error) {
        console.error("Failed to load initial invoices:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitialData();

    return () => {
      isMounted = false; // تنظيف الـ Hook (Cleanup Function)
    };
  }, []);

  return (
    <InvoiceContext.Provider value={{ invoices, loading, fetchInvoices }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error("useInvoices must be used within an InvoiceProvider");
  return context;
}