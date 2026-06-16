"use client";

import React, { useState } from "react";
import { Property } from "@/types/properites";

const numericFields = ["price", "area", "baths", "beds"];

export default function PropertyForm({ property }: { property: Property }) {
  const [formData, setFormData] = useState<Property>(property);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Updated Property:", formData);

    // await fetch(`/api/properties/${formData.id}`, { method: "PUT", body: JSON.stringify(formData) })
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mt-4 mx-auto p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">تعديل العقار</h2>
        <p className="text-sm text-gray-500 mt-1">
          عدّل بيانات العقار ثم احفظ التغييرات
        </p>
      </div>

      {/* Title */}
      <Field label="العنوان">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="عنوان العقار"
          className="input"
        />
      </Field>

      {/* Location */}
      <Field label="الموقع">
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="الموقع"
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
            type="number"
            value={formData.beds}
            onChange={handleChange}
            placeholder="0"
            className="input"
          />
        </Field>
      </div>

      {/* Book Type */}
      <Field label="نوع الحجز">
        <input
          name="bookType"
          value={formData.bookType}
          onChange={handleChange}
          placeholder="نوع الحجز"
          className="input"
        />
      </Field>

      {/* Description */}
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

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
      >
        حفظ التعديلات
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
