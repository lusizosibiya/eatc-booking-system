import { LayoutDashboard, CalendarDays } from "lucide-react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const linkStyle =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors";

  return (
    <aside className="w-full border-b border-slate-200 bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <h2 className="mb-8 text-xl font-bold text-[#171C2E]">EATC Admin</h2>

      <nav className="flex gap-2 md:flex-col">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive
                ? "bg-[#E5F5FD] text-[#29B4E4]"
                : "text-slate-600 hover:bg-slate-100"
            }`
          }
        >
          <LayoutDashboard size={19} />
          Dashboard
        </NavLink>

        <a
          href="/admin#appointments"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          <CalendarDays size={19} />
          Appointments
        </a>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
