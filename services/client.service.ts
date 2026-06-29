import { Client, ClientFilterTab, InstallmentInput } from '@/interfaces/client.interface';
import Cookies from 'js-cookie';

const BASE_URL = 'https://back-end-crm-project.vercel.app/api';

export async function getClients(tab: ClientFilterTab, signal?: AbortSignal): Promise<Client[]> {
  let url: string;
  if (tab === 'all') {
    url = `${BASE_URL}/clients/getAllClients?page=1&limit=8`;
  } else if (tab === 'debt') {
    url = `${BASE_URL}/clients/debt`;
  } else {
    url = `${BASE_URL}/clients/paid`;
  }
  const token = Cookies.get('admin_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await fetch(url, { method: 'GET', headers, signal });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل في جلب بيانات العملاء');
    }
    const data = await response.json();
    return data.clients || data.allClients || data.data || [];
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    throw error;
  }
}

export async function createClient(payload: { user_id: string; property_id: string; totalPrice: number; downPayment: number; notes?: string; installments: InstallmentInput[]; }): Promise<Client> {
  const token = Cookies.get('admin_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}/clients/addclient`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'فشل في إضافة العميل');
  }
  return response.json();
}

export async function deleteClient(clientId: string): Promise<{ success: boolean }> {
  const token = Cookies.get('admin_token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(
      `https://back-end-crm-project.vercel.app/api/clients/deleteclient/${clientId}`,
      {
        method: 'DELETE',
        headers,
      }
    );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'فشل في حذف العميل');
  }
  return response.json();
}

export async function updateInstallmentStatus(clientId: string, installmentId: string, status: 'PENDING' | 'PAID'): Promise<Client> {
  throw new Error('تحديث الأقساط غير مدعوم حالياً في السيرفر');
}