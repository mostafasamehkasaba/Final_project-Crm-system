"use client"
import React, { useState } from 'react';

function generateInvoiceNumber() {
  const year = new Date().getFullYear()
  const randomDigest = Math.floor(1000 + Math.random() * 9000)
  return `INV-${year}-${randomDigest}`;
}

export default function NewInvoice() {
  const [invoiceNumber] = useState(generateInvoiceNumber)
  const [products, setProducts] = useState(() => [
    { id: Date.now(), name: "", price: 0, discount: 0, tax: 15 }
  ])
  const [extraDiscount, setExtraDiscount] = useState(0)

  const [paidAmount, setPaidAmount] = useState(0)

  const addProduct = () => {
    setProducts(p => [
      ...p, { id: Date.now(), name: "", price: 0, discount: 0, tax: 15 }
    ])
  }

  const removeProduct = (id: number) => {
    setProducts(products => products.length > 1 ? products.filter(p => p.id !== id) : products);
  };

  const updateProduct = (id: number, field: string, value: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const calcRowTotal = (p: { price: number, discount: number, tax: number }) => {
    const price = parseFloat(String(p.price)) || 0
    const discount = parseFloat(String(p.discount)) || 0
    const tax = parseFloat(String(p.tax)) || 0
    const afterDiscount = price * (1 - discount / 100)
    return afterDiscount * (1 + tax / 100)
  }

  const subtotal = products.reduce((sum, p) => sum + (parseFloat(String(p.price)) || 0), 0)

  const totalRowDiscounts = products.reduce((sum, p) => {
    const price = parseFloat(String(p.price)) || 0
    const discount = parseFloat(String(p.discount)) || 0
    return sum + price * (discount / 100)
  }, 0)


  const totalTax = products.reduce((sum, p) => {
    const price = parseFloat(String(p.price)) || 0
    const discount = parseFloat(String(p.discount)) || 0
    const tax = parseFloat(String(p.tax)) || 0
    return sum + price * (1 - discount / 100) * (tax / 100)
  }, 0)
  const grandTotal = subtotal - totalRowDiscounts - (parseFloat(String(extraDiscount)) || 0) + totalTax
  
  const remaining = grandTotal - paidAmount 
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-sm">
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
              <input type='text' placeholder='ادخل اسم العميل' className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500" />
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
              <label className="block text-gray-600 mb-1">الحالة</label>
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
            <button onClick={addProduct} className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1 bg-green-100 px-3 h-8 rounded-xl">
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
                {products.map((p, i) => (
                  <tr key={p.id} className="border-b border-gray-100">
                    <td className="p-1 text-gray-500 text-center">{i + 1}</td>
                    <td className="p-1">
                      <input type="text"
                        value={p.name}
                        onChange={e => updateProduct(p.id, 'name', e.target.value)}
                        placeholder="اسم المنتج أو الخدمة"
                        className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500"
                      />
                    </td>
                    <td className="p-1">
                      <input type="number"
                        value={p.price}
                        onChange={e => updateProduct(p.id, 'price', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none text-center"
                      />
                    </td>
                    <td className="p-1">
                      <input type="number"
                        value={p.discount}
                        onChange={e => updateProduct(p.id, 'discount', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none text-center"
                      />
                    </td>
                    <td className="p-1">
                      <input type="number"
                        value={p.tax}
                        onChange={e => updateProduct(p.id, 'tax', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none text-center"
                      />
                    </td>
                    <td className="p-3 font-bold text-gray-800 text-center">
                      {calcRowTotal(p).toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => removeProduct(p.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M1 1l8 8M9 1l-8 8" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
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
                <input
                  type="number"
                  value={paidAmount}
                  onChange={e => setPaidAmount(parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500 text-left"
                  dir="ltr"
                  />
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
                <textarea placeholder="ملاحظات إضافية..." className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">الحسابات</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span className="font-medium text-gray-800">{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>خصم المنتجات</span>
                  <span className="font-medium text-red-400">− {totalRowDiscounts.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>خصم إضافي</span>
                  <input
                    type="number"
                    value={extraDiscount}
                    onChange={e => setExtraDiscount(parseFloat(e.target.value) || 0)}
                    className="w-24 border border-gray-300 rounded-md p-1 outline-none text-center focus:border-green-500"
                  />
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>الضريبة</span>
                  <span className="font-medium text-gray-800">+ {totalTax.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-800">الإجمالي النهائي</span>
              <span className="text-2xl font-bold text-green-600">{grandTotal.toFixed(2)}</span>
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
