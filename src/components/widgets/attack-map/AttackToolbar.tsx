import { Globe, ShieldAlert } from "lucide-react";

import ConnectionBadge from "./ConnectionBadge";

interface AttackToolbarProps {
  connected: boolean;
  totalAttacks: number;
}

export default function AttackToolbar({
  connected,
  totalAttacks,
}: AttackToolbarProps) {
  return (
    <div className="mb-6 flex items-center justify-between">

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">

            <Globe
              size={24}
              className="text-cyan-400"
            />

          </div>

          <div>

            <h2 className="text-3xl font-black tracking-tight text-white">
              Global Attack Monitor
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Live Cyber Threat Intelligence
            </p>

          </div>

        </div>

      </div>

      <div className="flex items-center gap-5">

        <div className="rounded-2xl border border-cyan-500/20 bg-[#0B1220]/80 px-5 py-3 backdrop-blur-xl">

          <div className="flex items-center gap-3">

            <ShieldAlert
              size={22}
              className="text-red-400"
            />

            <div>

              <p className="text-xs uppercase tracking-widest text-gray-500">
                Live Attacks
              </p>

              <p className="text-2xl font-black text-red-400">
                {totalAttacks}
              </p>

            </div>

          </div>

        </div>

        <ConnectionBadge
          connected={connected}
        />

      </div>

    </div>
  );
}