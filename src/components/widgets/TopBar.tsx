import { useState } from "react";

import {
  Bell,
  Search,
  Shield,
  Settings,
  Moon,
} from "lucide-react";

import NotificationPanel from "./NotificationBell";

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 mb-8">

      <div className="glass flex h-20 items-center justify-between rounded-2xl px-8">

        <div>

          <h1 className="text-3xl font-black tracking-tight text-white">
            Security Operations Center
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Enterprise Monitoring Dashboard
          </p>

        </div>

        <div className="flex items-center gap-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search alerts, hosts, CVEs..."
              className="w-80 rounded-xl border border-cyan-500/20 bg-[#0B1220] py-3 pl-11 pr-4 text-white outline-none transition-all focus:border-cyan-400"
            />

          </div>

          <button className="rounded-xl border border-cyan-500/20 bg-[#0B1220] p-3 transition hover:border-cyan-400 hover:bg-cyan-500/10">

            <Moon
              size={20}
              className="text-cyan-400"
            />

          </button>

          <button className="rounded-xl border border-cyan-500/20 bg-[#0B1220] p-3 transition hover:border-cyan-400 hover:bg-cyan-500/10">

            <Settings
              size={20}
              className="text-cyan-400"
            />

          </button>

          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="relative rounded-xl border border-cyan-500/20 bg-[#0B1220] p-3 transition hover:border-cyan-400 hover:bg-cyan-500/10"
            >

              <Bell
                size={20}
                className="text-cyan-400"
              />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">

                4

              </span>

            </button>

            {open && <NotificationPanel />}

          </div>

          <div className="glass flex items-center gap-4 rounded-xl px-4 py-2">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/20">

              <Shield
                size={22}
                className="text-cyan-400"
              />

            </div>

            <div>

              <h3 className="font-semibold text-white">
                SOC Analyst
              </h3>

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <span className="text-xs text-green-400">
                  Online
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}