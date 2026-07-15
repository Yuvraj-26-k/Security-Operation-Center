import { useState } from "react";
import {
  LayoutDashboard,
  TriangleAlert,
  FolderKanban,
  Monitor,
  Globe,
  FileText,
  Shield,
  Bug,
  ScanSearch,
  ShieldCheck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Alerts", path: "/alerts", icon: TriangleAlert },
  { title: "Incidents", path: "/incidents", icon: FolderKanban },
  { title: "Endpoints", path: "/endpoints", icon: Monitor },
  { title: "Network", path: "/network", icon: Globe },
  { title: "Logs", path: "/logs", icon: FileText },
  { title: "Threat Intel", path: "/threat-intel", icon: Shield },
  { title: "Malware", path: "/malware", icon: Bug },
  { title: "Vulnerability", path: "/vulnerability", icon: ScanSearch },
  { title: "Rules", path: "/rules", icon: ShieldCheck },
  { title: "Reports", path: "/reports", icon: BarChart3 },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative transition-all duration-300 border-r border-cyan-500/20 bg-[#0B1220]
      ${collapsed ? "w-24" : "w-72"}`}
    >

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-8 z-50 rounded-full border border-cyan-500/20 bg-[#111827] p-2 hover:bg-cyan-500 hover:text-black"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <div className="border-b border-cyan-500/20 p-6">

        <h1 className="text-3xl font-black text-cyan-400">
          {collapsed ? "S" : "SentinelSOC"}
        </h1>

        {!collapsed && (
          <p className="mt-2 text-sm text-gray-500">
            Enterprise Edition
          </p>
        )}

      </div>

      <nav className="p-4 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-cyan-500 text-black"
                    : "text-gray-400 hover:bg-[#172033] hover:text-cyan-400"
                }`
              }
            >

              <Icon size={20} />

              {!collapsed && (
                <span className="ml-4 font-medium">
                  {item.title}
                </span>
              )}

            </NavLink>

          );

        })}

      </nav>

      {!collapsed && (

        <div className="absolute bottom-6 left-4 right-4 rounded-xl bg-[#111827] p-4">

          <p className="text-xs uppercase tracking-widest text-gray-500">
            SOC STATUS
          </p>

          <div className="mt-3 flex items-center gap-2">

            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            <span className="text-green-400 text-sm">
              All Systems Healthy
            </span>

          </div>

        </div>

      )}

    </aside>
  );
}