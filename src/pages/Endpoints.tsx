import { useEffect, useState } from "react";
import {
  Laptop,
  Server,
  ShieldCheck,
  Wifi,
  HardDrive,
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

interface Endpoint {
  name: string;
  type: string;
  status: string;
  ip: string;
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

export default function Endpoints() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [stats, setStats] = useState({
    protected: 0,
    online: 0,
    servers: 0,
    offline: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:8000/dashboard");
        const data: DashboardResponse = await response.json();

        const uniqueEndpoints = Array.from(
          new Map(
            data.recent_events.map((event) => [
              event.hostname,
              {
                name: event.hostname,
                type: event.city || "Windows",
                status: "Protected",
                ip: event.source_ip,
              },
            ])
          ).values()
        );

        const servers = uniqueEndpoints.filter((endpoint) =>
          endpoint.type.toLowerCase().includes("server")
        ).length;

        setStats({
          protected: data.overview.protected_endpoints,
          online: uniqueEndpoints.length,
          servers,
          offline: 0,
        });

        setEndpoints(uniqueEndpoints);
      } catch (error) {
        console.error("Failed to fetch endpoints:", error);
      }
    };

    fetchDashboard();
  }, []);

  const getIcon = (type: string) => {
    const value = type.toLowerCase();

    if (value.includes("server")) return Server;
    if (value.includes("network")) return Wifi;
    if (value.includes("linux")) return HardDrive;
    if (value.includes("ubuntu")) return HardDrive;

    return Laptop;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-white">
          Endpoint Management
        </h1>

        <p className="mt-2 text-gray-400">
          Monitor managed devices across the organization
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">
          <ShieldCheck className="text-cyan-400" size={34} />

          <p className="mt-4 text-gray-400">
            Protected
          </p>

          <h2 className="mt-2 text-5xl font-black text-cyan-400">
            {stats.protected}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-500/20 bg-[#111827] p-6">
          <Laptop className="text-green-400" size={34} />

          <p className="mt-4 text-gray-400">
            Online
          </p>

          <h2 className="mt-2 text-5xl font-black text-green-400">
            {stats.online}
          </h2>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-[#111827] p-6">
          <Server className="text-yellow-400" size={34} />

          <p className="mt-4 text-gray-400">
            Servers
          </p>

          <h2 className="mt-2 text-5xl font-black text-yellow-400">
            {stats.servers}
          </h2>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-[#111827] p-6">
          <Wifi className="text-red-500" size={34} />

          <p className="mt-4 text-gray-400">
            Offline
          </p>

          <h2 className="mt-2 text-5xl font-black text-red-500">
            {stats.offline}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400">
              <th className="pb-4">Device</th>
              <th>Operating System</th>
              <th>Status</th>
              <th>IP Address</th>
            </tr>
          </thead>

          <tbody>
            {endpoints.map((endpoint) => {
              const Icon = getIcon(endpoint.type);

              return (
                <tr
                  key={endpoint.name}
                  className="border-b border-[#1f2937] hover:bg-[#182233]"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <Icon className="text-cyan-400" />
                      {endpoint.name}
                    </div>
                  </td>

                  <td>{endpoint.type}</td>

                  <td>
                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
                      {endpoint.status}
                    </span>
                  </td>

                  <td>{endpoint.ip}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}