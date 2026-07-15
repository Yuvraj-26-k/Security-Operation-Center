import {
  Activity,
  AlertTriangle,
  Globe2,
  Shield,
} from "lucide-react";

import type { AttackEvent } from "../../../types/attack";

interface AttackStatsProps {
  attacks: AttackEvent[];
}

export default function AttackStats({
  attacks,
}: AttackStatsProps) {
  const countries = new Set<string>();

  attacks.forEach((attack) => {
    countries.add(attack.source_country);
    countries.add(attack.destination_country);
  });

  const critical = attacks.filter(
    (attack) => attack.severity === "Critical"
  ).length;

  const high = attacks.filter(
    (attack) => attack.severity === "High"
  ).length;

  const averageRisk =
    attacks.length > 0
      ? Math.round(
          attacks.reduce(
            (sum, attack) => sum + attack.risk_score,
            0
          ) / attacks.length
        )
      : 0;

  const cards = [
    {
      title: "Countries",
      value: countries.size,
      icon: Globe2,
      color: "text-cyan-400",
      border: "border-cyan-500/20",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Critical",
      value: critical,
      icon: AlertTriangle,
      color: "text-red-400",
      border: "border-red-500/20",
      bg: "bg-red-500/10",
    },
    {
      title: "High Severity",
      value: high,
      icon: Shield,
      color: "text-yellow-400",
      border: "border-yellow-500/20",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Avg Risk",
      value: `${averageRisk}%`,
      icon: Activity,
      color: "text-green-400",
      border: "border-green-500/20",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`group rounded-2xl border ${card.border} bg-[#0B1220]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg}`}
              >
                <Icon
                  size={22}
                  className={card.color}
                />
              </div>

              <span className="text-xs uppercase tracking-widest text-gray-500">
                LIVE
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-400">
                {card.title}
              </p>

              <h3
                className={`mt-2 text-4xl font-black ${card.color}`}
              >
                {card.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}