import React from 'react'

const Navbar = () => {
  return (
   <div className="">
      <nav className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
        <h1 className="font-bold text-xl text-blue-700">عقارات مصر</h1>
        <div className="flex gap-4">
          <span>الرئيسية</span>
          <span>العقارات</span>
          <span>نبذة عنا</span>
          <span>المفضلة</span>
          
        </div>
      </nav>
      </div>
  )
}

export default Navbar