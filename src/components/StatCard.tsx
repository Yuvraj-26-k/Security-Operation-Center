import { TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: Props) {
  return (
    <div
      className="
      rounded-2xl
      bg-[#111827]
      border
      border-cyan-500/20
      p-6
      transition-all
      duration-300
      hover:scale-105
      hover:border-cyan-400
      hover:shadow-[0_0_25px_rgba(34,211,238,.35)]
    "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>

          <h2
            className="text-5xl font-bold mt-3"
            style={{ color }}
          >
            {value}
          </h2>

          <div className="flex items-center gap-2 mt-4 text-green-400 text-sm">
            <TrendingUp size={18} />
            +12% Today
          </div>
        </div>

        <div
          className="rounded-full p-4"
          style={{ background: `${color}22` }}
        >
          <Icon size={34} color={color} />
        </div>
      </div>
    </div>
  );
}