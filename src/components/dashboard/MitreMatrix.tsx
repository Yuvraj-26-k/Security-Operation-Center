import {
  Shield,
  Crosshair,
  Search,
  KeyRound,
  Terminal,
  Database,
  Bug,
  Globe,
} from "lucide-react";

const tactics = [
  {
    name: "Initial Access",
    icon: Globe,
    color: "text-cyan-400",
    techniques: 8,
  },
  {
    name: "Execution",
    icon: Terminal,
    color: "text-green-400",
    techniques: 13,
  },
  {
    name: "Persistence",
    icon: Shield,
    color: "text-yellow-400",
    techniques: 9,
  },
  {
    name: "Privilege Esc.",
    icon: KeyRound,
    color: "text-orange-400",
    techniques: 5,
  },
  {
    name: "Discovery",
    icon: Search,
    color: "text-blue-400",
    techniques: 18,
  },
  {
    name: "Credential Access",
    icon: Database,
    color: "text-pink-400",
    techniques: 7,
  },
  {
    name: "Lateral Movement",
    icon: Crosshair,
    color: "text-purple-400",
    techniques: 4,
  },
  {
    name: "Impact",
    icon: Bug,
    color: "text-red-500",
    techniques: 11,
  },
];

export default function MitreMatrix() {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            MITRE ATT&CK Coverage
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Detection coverage by tactic
          </p>

        </div>

        <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
          87% Coverage
        </div>

      </div>

      <div className="grid grid-cols-4 gap-4">

        {tactics.map((tactic) => {
          const Icon = tactic.icon;

          return (
            <div
              key={tactic.name}
              className="rounded-xl border border-cyan-500/10 bg-[#0B1220] p-5 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,.25)]"
            >

              <div className="flex items-center justify-between">

                <Icon
                  size={24}
                  className={tactic.color}
                />

                <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
                  {tactic.techniques}
                </span>

              </div>

              <h3 className="mt-5 font-semibold text-white">
                {tactic.name}
              </h3>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#1E293B]">

                <div
                  className="h-full rounded-full bg-cyan-400"
                  style={{
                    width: `${Math.min(
                      tactic.techniques * 7,
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}