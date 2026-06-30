"use client";

import { useState } from "react";
import { createBooking } from "@/services/booking";

interface CreateBookingProps {
  propertyId: string;
  onClose: () => void;
}

export default function CreateBooking({
  propertyId,
  onClose,
}: CreateBookingProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createBooking({
        property_id: propertyId,
        ...formData,
      });

      alert("تم حجز العقار بنجاح");

      setFormData({
        name: "",
        email: "",
        phone: "",
      });

      onClose();
    } catch (error: any) {
      alert(error.message || "حدث خطأ أثناء الحجز");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          حجز العقار
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="الاسم بالكامل"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />

          <input
            type="tel"
            placeholder="رقم الهاتف"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white text-right"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "جاري إرسال الطلب..."
              : "تأكيد الحجز"}
          </button>
        </form>
      </div>
    </div>
  );
}