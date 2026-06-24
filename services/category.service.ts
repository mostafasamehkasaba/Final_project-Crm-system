import Cookies from "js-cookie";
import { Category, CreateCategoryPayload } from "@/types/category";

// 💡 تأكد إذا كان الباك إند في الجلب يستخدم المفرد category أم الجمع categories
const API_URL = "https://back-end-crm-project.vercel.app/api/category";

const getHeaders = () => {
  const token = Cookies.get("admin_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// 1. جلب جميع التصنيفات
export async function getAllCategories(): Promise<any> {
  // 🌟 إذا كان رابط الجلب الناجح يختلف عن الـ API_URL الأساسي قم بتعديله هنا مباشرة
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("فشل في جلب التصنيفات من السيرفر");
  }
  return res.json(); // سيرجع الـ Object كامل الذي يحتوي على success و data
}

// 2. إضافة تصنيف جديد
export async function createCategory(payload: CreateCategoryPayload): Promise<Category> {
  const res = await fetch(`${API_URL}`, { 
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "فشل في إنشاء التصنيف الجديد");
  }
  return res.json();
}

// 3. حذف تصنيف
export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("فشل في حذف التصنيف من السيرفر");
  }
}

// 4. تعديل تصنيف حالي
export async function updateCategory(id: string, payload: CreateCategoryPayload): Promise<Category> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT", // 💡 لو الباك إند بتاعك شغال PATCH عدلها هنا لـ PATCH
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "فشل في تحديث التصنيف");
  }
  return res.json();
}