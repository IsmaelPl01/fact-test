import { NavLink, Outlet } from "react-router-dom";
import { Users, FileText, LayoutDashboard, PlusCircle } from "lucide-react";
import { cn } from "../lib/utils";

export function Layout() {
  const navItems = [
    { to: "/facturas", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/facturas/nueva", icon: PlusCircle, label: "Nueva Factura" },
    { to: "/clientes", icon: Users, label: "Clientes" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0 flex items-center">
                <FileText className="h-8 w-8 text-primary-600" />
                <span className="ml-2 font-bold text-xl tracking-tight text-slate-900">
                  FacturEasy
                </span>
              </div>
              <div className="hidden sm:flex sm:space-x-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "inline-flex items-center px-4 py-2 mt-3 rounded-t-lg text-sm font-medium transition-colors border-b-2",
                        isActive
                          ? "bg-primary-50 text-primary-700 border-primary-600"
                          : "text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300"
                      )
                    }
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              {/* Optional: Add user profile here in the future */}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
