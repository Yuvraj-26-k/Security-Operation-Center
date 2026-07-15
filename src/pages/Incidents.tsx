import { useEffect, useState } from "react";
import {
  ShieldAlert,
  Clock3,
  User,
  CheckCircle2,
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

interface Incident {
  id: string;
  title: string;
  analyst: string;
  priority: string;
  status: string;
  created: string;
}

export default function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [stats, setStats] = useState({
    active: 0,
    pending: 0,
    analysts: 1,
    resolved: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:8000/dashboard");
        const data: DashboardResponse = await response.json();

        setStats({
          active: data.overview.active_threats,
          pending: Math.max(
            0,
            data.recent_events.filter(
              (e) =>
                e.severity === "Medium" ||
                e.severity === "High"
            ).length
          ),
          analysts: 1,
          resolved: Math.max(
            0,
            data.overview.total_events -
              data.overview.active_threats
          ),
        });

        const generatedIncidents = data.recent_events.map((event) => ({
          id: `INC-${String(event.id).padStart(4, "0")}`,
          title: event.event_type,
          analyst: "SOC Analyst",
          priority: event.severity,
          status:
            event.severity === "Critical" ||
            event.severity === "High"
              ? "Investigating"
              : "Open",
          created: new Date(
            event.timestamp
          ).toLocaleTimeString(),
        }));

        setIncidents(generatedIncidents);
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">
            Incident Response
          </h1>

          <p className="mt-2 text-gray-400">
            Track and manage security incidents
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-2xl border border-red-500/20 bg-[#111827] p-6">
          <ShieldAlert className="text-red-500" size={34} />

          <p className="mt-4 text-gray-400">
            Active
          </p>

          <h2 className="mt-2 text-5xl font-black text-red-500">
            {stats.active}
          </h2>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-[#111827] p-6">
          <Clock3 className="text-yellow-400" size={34} />

          <p className="mt-4 text-gray-400">
            Pending
          </p>

          <h2 className="mt-2 text-5xl font-black text-yellow-400">
            {stats.pending}
          </h2>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">
          <User className="text-cyan-400" size={34} />

          <p className="mt-4 text-gray-400">
            Analysts
          </p>

          <h2 className="mt-2 text-5xl font-black text-cyan-400">
            {stats.analysts}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-500/20 bg-[#111827] p-6">
          <CheckCircle2 className="text-green-400" size={34} />

          <p className="mt-4 text-gray-400">
            Resolved
          </p>

          <h2 className="mt-2 text-5xl font-black text-green-400">
            {stats.resolved}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400">
              <th className="pb-4">Incident</th>
              <th>Title</th>
              <th>Analyst</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                className="border-b border-[#1f2937] hover:bg-[#182233]"
              >
                <td className="py-5 font-semibold">
                  {incident.id}
                </td>

                <td>{incident.title}</td>

                <td>{incident.analyst}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      incident.priority === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : incident.priority === "High"
                        ? "bg-orange-500/20 text-orange-400"
                        : incident.priority === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {incident.priority}
                  </span>
                </td>

                <td>{incident.status}</td>

                <td>{incident.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}