"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/types/properites";

const numericFields = ["price", "area", "baths"];

const emptyProperty: Omit<Property, "id"> = {
  type: "",
  beds: "",
  location: "",
  price: 0,
  bookType: "",
  area: 0,
  baths: 0,
  title: "",
  description: "",
  image: "",
};

export default function PropertyCreateForm() {
  const [formData, setFormData] = useState<Omit<Property, "id">>(emptyProperty);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    console.log("Okay");
    router.push("/products");

    // try {
    //   const res = await fetch("/api/properties", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!res.ok) throw new Error("فشل إضافة العقار");

    //   router.push("/properties");
    // } catch (err) {
    //   setError("حصل خطأ، حاول تاني");
    // } finally {
    //   setIsSaving(false);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mt-3 mx-auto p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">إضافة عقار جديد</h2>
        <p className="text-sm text-gray-500 mt-1">
          أدخل بيانات العقار ثم اضغط حفظ
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      <Field label="العنوان">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="عنوان العقار"
          className="input"
        />
      </Field>

      <Field label="الموقع">
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="الموقع"
          className="input"
        />
      </Field>

      <Field label="نوع المساحة">
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="مثال: 100متر"
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="السعر">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
            className="input"
          />
        </Field>

        <Field label="المساحة (م²)">
          <input
            name="area"
            type="number"
            value={formData.area}
            onChange={handleChange}
            placeholder="0"
            className="input"
          />
        </Field>

        <Field label="الحمامات">
          <input
            name="baths"
            type="number"
            value={formData.baths}
            onChange={handleChange}
            placeholder="0"
            className="input"
          />
        </Field>

        <Field label="الغرف">
          <input
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            placeholder="مثال: 02 أو الارضي"
            className="input"
          />
        </Field>
      </div>

      <Field label="نوع الحجز">
        <input
          name="bookType"
          value={formData.bookType}
          onChange={handleChange}
          placeholder="Daily / Weekly / Monthly / Yearly"
          className="input"
        />
      </Field>

      <Field label="رابط الصورة">
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://..."
          className="input"
        />
      </Field>

      <Field label="الوصف">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="وصف العقار"
          rows={4}
          className="input resize-none"
        />
      </Field>

      <button
        type="submit"
        disabled={isSaving}
        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? "جاري الحفظ..." : "إضافة العقار"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
