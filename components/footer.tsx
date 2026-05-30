import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
const Footer = () => {
  return (
    <footer
      className="bg-[#171717] w-full text-gray-400 pt-12 pb-6 border-t border-gray-800"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-16 text-center sm:text-right">
        <div className="flex flex-col items-center sm:items-start gap-3">
          <div className="flex items-center gap-2">
            <div className="logo w-7 h-8  rounded-lg shadow-md text-2xl">
              <FaBuilding />
            </div>
            <h2 className="text-white text-2xl font-black tracking-wide">
              عقارات مصر
            </h2>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto sm:mx-0">
            بوابتك الأولى والأكثر أماناً للبحث عن العقارات الفاخرة، الشقق،
            والفيلات في كافة أنحاء جمهورية مصر العربية.
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-3.5">
          <h1 className="text-white font-bold text-lg border-b border-gray-800 pb-1 w-fit">
            الروابط السريعة
          </h1>
          <div className="flex flex-col items-center sm:items-start gap-2.5 text-sm">
            <Link
              href="/"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              الصفحة الرئيسية
            </Link>
            <Link
              href="/about"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              نبذة عنا
            </Link>
            <Link
              href="/categoris"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              التصنيفات
            </Link>
            <Link
              href="/contact-us"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              تواصل معنا
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-3 col-span-1 sm:col-span-2 md:col-span-1 max-w-md mx-auto sm:w-full sm:mx-0 mt-6 md:mt-0">
          <h2 className="text-white font-bold text-lg">
            تواصل معنا لمعرفة المزيد
          </h2>
          <label htmlFor="emailInput" className="text-sm text-gray-500">
            يرجى إدخال بريدك الإلكتروني ليصلك كل جديد
          </label>

          <input
            id="emailInput"
            type="email"
            placeholder="example@gmail.com"
            dir="ltr"
            className="bg-transparent border-b border-gray-700 w-full pb-2 text-white outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm mt-2 text-center sm:text-left"
          />

          <button className="relative p-[2px] rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-transparent transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer w-36 mt-4">
            <div className="bg-[#171717] text-gray-300 group-hover:text-white px-5 py-2 rounded-[10px] text-sm font-semibold transition-colors h-full w-full flex items-center justify-center">
              اشتراك
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-center md:text-right">
        <p className="w-full md:w-1/3 text-sm text-gray-500 leading-relaxed">
          نساعدك في اكتشاف وتأمين عقار أحلامك بكل سهولة وبأعلى معايير الأمان
          الممكنة.
        </p>

        <div className="flex gap-6 text-sm font-medium">
          <Link
            href="/privacy"
            className="cursor-pointer hover:text-white transition-colors duration-200"
          >
            سياسة الخصوصية
          </Link>
          <Link
            href="/support"
            className="hover:text-white transition-colors duration-200"
          >
            مركز الدعم
          </Link>
        </div>

        <div className="flex gap-5 text-2xl text-gray-400">
          <a
            href="#"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            <FaFacebookSquare />
          </a>
          <a
            href="#"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            <FaSquareXTwitter />
          </a>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 my-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full" />
      </div>

      <div className="w-full text-center text-xs text-gray-600 px-6">
        <p>@{new Date().getFullYear()} عقارات مصر. جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
};

export default Footer;
