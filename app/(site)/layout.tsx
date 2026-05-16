export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
        <h1 className="font-bold text-xl text-blue-700">عقارات مصر</h1>
        <div className="flex gap-4">
          <span>الرئيسية</span>
          <span>العقارات</span>
          <span>المفضلة</span>
        </div>
      </nav>


      <main className="flex-1">
        {children}
      </main>

     
      <footer className="bg-zinc-900 text-white p-6 text-center">
        <p>© 2026 مشروع العقارات - كل الحقوق محفوظة</p>
      </footer>
    </div>
  );
}