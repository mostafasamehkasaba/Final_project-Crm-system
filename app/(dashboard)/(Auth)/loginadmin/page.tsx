"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../../../../services/getProperties.services";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(email, password);
      alert("تم تسجيل الدخول بنجاح!");
      router.push("/products"); // حوله للداشبورد بعد النجاح
    } catch (err) {
      alert("خطأ: تأكد من الإيميل والباسورد");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded-2xl shadow-sm border w-96"
      >
        <h1 className="text-xl font-bold mb-6 text-center">دخول لوحة التحكم</h1>
        <input
          type="email"
          className="w-full p-3 border rounded-xl mb-4"
          placeholder="الإيميل"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-3 border rounded-xl mb-6"
          placeholder="كلمة المرور"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white p-3 rounded-xl font-bold hover:bg-green-800 transition"
        >
          دخول الأدمن
        </button>
      </form>
    </div>
  );
}
