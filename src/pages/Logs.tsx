import { useEffect, useState } from "react";
import {
  Search,
  Terminal,
  ShieldCheck,
} from "lucide-react";

interface EventLog {
  id: number;
  timestamp: string;
  source_ip: string;
  destination_ip: string;
  country: string;
  city: string;
  event_type: string;
  severity: string;
  hostname: string;
}

interface DashboardResponse {
  overview: {
    total_events: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    events_per_minute: number;
    protected_endpoints: number;
    security_score: number;
    active_threats: number;
  };
  recent_events: EventLog[];
}

export default function Logs() {
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [overview, setOverview] = useState({
    total_events: 0,
    protected_endpoints: 0,
    active_threats: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:8000/dashboard");
        const data: DashboardResponse = await response.json();

        setLogs(data.recent_events);
        setOverview({
          total_events: data.overview.total_events,
          protected_endpoints: data.overview.protected_endpoints,
          active_threats: data.overview.active_threats,
        });
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">
            Security Logs
          </h1>

          <p className="mt-2 text-gray-400">
            Real-time event monitoring
          </p>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-gray-500"
            size={18}
          />

          <input
            placeholder="Search Logs..."
            className="w-80 rounded-xl border border-cyan-500/20 bg-[#111827] py-3 pl-10 pr-4 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">
          <Terminal
            className="text-cyan-400"
            size={34}
          />

          <p className="mt-4 text-gray-400">
            Total Logs
          </p>

          <h2 className="mt-2 text-5xl font-black text-cyan-400">
            {overview.total_events}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-500/20 bg-[#111827] p-6">
          <ShieldCheck
            className="text-green-400"
            size={34}
          />

          <p className="mt-4 text-gray-400">
            Protected Endpoints
          </p>

          <h2 className="mt-2 text-5xl font-black text-green-400">
            {overview.protected_endpoints}
          </h2>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-[#111827] p-6">
          <Terminal
            className="text-red-500"
            size={34}
          />

          <p className="mt-4 text-gray-400">
            Active Threats
          </p>

          <h2 className="mt-2 text-5xl font-black text-red-500">
            {overview.active_threats}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400">
              <th className="pb-4">Time</th>
              <th>Level</th>
              <th>Source</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-b border-[#1f2937] hover:bg-[#182233]"
              >
                <td className="py-5">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      log.severity === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : log.severity === "High"
                        ? "bg-orange-500/20 text-orange-400"
                        : log.severity === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {log.severity}
                  </span>
                </td>

                <td>{log.hostname}</td>

                <td>
                  {log.event_type} ({log.source_ip} → {log.destination_ip})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}