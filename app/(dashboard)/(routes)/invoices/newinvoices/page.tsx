"use client"
import React, { useState } from 'react';

function generateInvoiceNumber (){
    const year = new Date().getFullYear()
    const rondomdigest = Math.floor(1000 + Math.random() * 9000)
    return `INV-${year}-${rondomdigest}`;
}

export default function NewInvoice() {
    const [invoiceNumber ] = useState(generateInvoiceNumber)
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-sm ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">فاتورة جديدة</h2>
        <p className="text-gray-500 mt-1">إنشاء فاتورة مبيعات جديدة</p>
      </div>

      <div className="flex flex-col gap-6 w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-500">🧾</span>
            <h3 className="font-semibold text-gray-800">معلومات الفاتورة</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">الوحده/العميل <span className="text-red-500">*</span></label>
              <input type='text' placeholder='ادخل اسم العميل ' className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">تاريخ الفاتورة</label>
              <input type="date" className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">تاريخ الاستحقاق</label>
              <input type="date" className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 "> الحالة</label>
              <select className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500">
                <option>مدفوعه</option>
                <option>لم يتم الدفع</option>
              </select>
            </div>
          
            <div>
              <label className="block text-gray-600 mb-1">رقم الفاتورة</label>
              <input type="text" value={invoiceNumber} readOnly className="w-full p-2 border bg-gray-50 rounded-lg text-sm text-gray-500 font-bold" dir="rtl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-green-500">📦</span>
              <h3 className="font-semibold text-gray-800">المنتجات والخدمات</h3>
            </div>
            <button className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1 bg-green-100 px-3 h-8 rounded-xl">
              + إضافة منتج
            </button>
          </div>

          <div className="mb-4">
            <input type="text" placeholder="ابحث بالاسم، الباركود، أو الرقم المرجعي..." className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[800px]">
              <thead className="bg-gray-50 text-gray-600 text-xs">
                <tr>
                  <th className="p-3 font-medium w-10">#</th>
                  <th className="p-3 font-medium w-1/3">المنتج</th>
                  <th className="p-3 font-medium">السعر</th>
                  <th className="p-3 font-medium">خصم%</th>
                  <th className="p-3 font-medium">ضريبة%</th>
                  <th className="p-3 font-medium">الإجمالي</th>
                  <th className="p-3 font-medium w-10"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-3 text-gray-500">1</td>
                  <td>
                    <input type="text" placeholder="اسم المنتج أو الخدمة" className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500" />
                  </td>
                  <td className="p-3"><input type="number" defaultValue="1" className="w-full border border-gray-300 rounded-md p-2 outline-none text-center" /></td>
                  <td className="p-3"><input type="number" defaultValue="0" className="w-full border border-gray-300 rounded-md p-2 outline-none text-center" /></td>
                  <td className="p-3"><input type="number" defaultValue="0" className="w-full border border-gray-300 rounded-md p-2 outline-none text-center" /></td>
                  <td className="p-3"><input type="number" defaultValue="15" className="w-full border border-gray-300 rounded-md p-2 outline-none text-center" /></td>
                  <td className="p-3 font-bold text-gray-800 text-center">0.00</td>
                  <td className="p-3 text-center text-gray-400 hover:text-red-500 cursor-pointer">✕</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">معلومات الدفع</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">المبلغ المدفوع</label>
                <input type="number" defaultValue="0" className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500 text-left" dir="ltr" />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">المحفظة</label>
                <select className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500">
                  <option>الصندوق الرئيسي</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">طريقة الدفع</label>
                <select className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500">
                  <option>نقدي</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">ملاحظات</label>
                <textarea placeholder="ملاحظات إضافية..."  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">الحسابات</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span>0.00</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>خصم إضافي</span>
                  <input type="number" defaultValue="0" className="w-24 border border-gray-300 rounded-md p-1 outline-none text-center" />
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>الضريبة</span>
                  <span>0.00</span>
                </div>
             
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-800">الإجمالي النهائي</span>
              <span className="text-2xl font-bold text-green-600">0.00</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <span>💾</span> حفظ وإرسال
          </button>
          <button className="bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <span>🔗</span> مشاركة رابط
          </button>
          <button className="bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-md font-medium transition-colors">
            حفظ كمسودة
          </button>
          <button className="bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-md font-medium transition-colors">
            إلغاء
          </button>
        </div>
        
      </div>
    </div>
  );
}