// app/(dashboard)/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Users, Handshake, BarChart3, Settings, LogOut } from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Properties", href: "/dashboard/properties", icon: Building2 },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Deals", href: "/dashboard/deals", icon: Handshake },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex  overflow-hidden">   
     
      <div className="w-72 bg-white border-r shadow-sm flex flex-col flex-shrink-0">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">RealEstate CRM</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={22} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut size={22} />
            Logout
          </button>
        </div>
      </div>

      
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {children}
        </div>
        
      </div>
    </div>
  );
}