import { useEffect, useState } from "react";
import { Activity, ShieldCheck } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";

import useDashboard from "../../hooks/useDashboard";

interface ChartPoint {
  time: string;
  threats: number;
}

export default function ThreatOverview() {
  const { overview } = useDashboard();

  const [chartData, setChartData] =
    useState<ChartPoint[]>([]);

  useEffect(() => {
    if (!overview) return;

    const total =
      overview.critical +
      overview.high +
      overview.medium +
      overview.low;

    const now = new Date();

    setChartData((previous) => {
      const updated = [
        ...previous,
        {
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          threats: total,
        },
      ];

      return updated.slice(-20);
    });
  }, [overview]);

  if (!overview) {
    return (
      <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-8 text-center text-cyan-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">

      <div className="col-span-2 rounded-2xl border border-cyan-500/20 bg-[#111827] p-6 shadow-lg">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Threat Activity
            </h2>

            <p className="text-sm text-gray-400">
              Live Event Stream
            </p>

          </div>

          <Activity
            className="text-cyan-400"
            size={28}
          />

        </div>

        <div className="h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart data={chartData}>

              <defs>

                <linearGradient
                  id="threatFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#06b6d4"
                    stopOpacity={0.7}
                  />

                  <stop
                    offset="95%"
                    stopColor="#06b6d4"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid stroke="#233044" />

              <XAxis
                dataKey="time"
                stroke="#94a3b8"
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="threats"
                stroke="#06b6d4"
                fill="url(#threatFill)"
                strokeWidth={3}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6 shadow-lg">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold text-white">
            Security Score
          </h2>

          <ShieldCheck
            className="text-green-400"
            size={28}
          />

        </div>

        <div className="mt-10 flex justify-center">

          <div className="flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-cyan-400">

            <span className="text-5xl font-black text-cyan-400">

              {overview.security_score}

            </span>

          </div>

        </div>

        <div className="mt-10 space-y-4">

          <div className="flex justify-between">

            <span className="text-gray-400">
              Protected Endpoints
            </span>

            <span className="text-cyan-400">
              {overview.protected_endpoints}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">
              Events / Minute
            </span>

            <span className="text-cyan-400">
              {overview.events_per_minute}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">
              Active Threats
            </span>

            <span className="text-red-400">
              {overview.active_threats}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-400">
              Live Feed
            </span>

            <span className="animate-pulse text-green-400">
              Connected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}