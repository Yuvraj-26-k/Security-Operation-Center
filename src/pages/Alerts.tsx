import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Search,
  Filter,
} from "lucide-react";

import alertsService from "../services1.0/alerts.service";

type Alert = {
  id: number;
  title: string;
  severity: string;
  status: string;
  hostname: string;
  created_at: string;
};

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    loadAlerts();

    const timer = setInterval(loadAlerts, 3000);

    return () => clearInterval(timer);
  }, []);

  async function loadAlerts() {
    try {
      const data = await alertsService.getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error(error);
    }
  }

  const statistics = useMemo(() => ({
    critical: alerts.filter(a => a.severity === "Critical").length,
    high: alerts.filter(a => a.severity === "High").length,
    medium: alerts.filter(a => a.severity === "Medium").length,
    closed: alerts.filter(a => a.status === "Closed").length,
  }), [alerts]);

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-black text-white">
            Security Alerts
          </h1>

          <p className="mt-2 text-gray-400">
            Monitor and investigate security events
          </p>
        </div>

        <div className="flex gap-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-500"
            />

            <input
              placeholder="Search Alerts..."
              className="w-72 rounded-xl border border-cyan-500/20 bg-[#111827] py-3 pl-10 pr-4 outline-none"
            />

          </div>

          <button className="rounded-xl border border-cyan-500/20 bg-[#111827] px-4">
            <Filter />
          </button>

        </div>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="rounded-2xl border border-red-500/30 bg-[#111827] p-6">
          <AlertTriangle className="text-red-500" size={34}/>
          <p className="mt-4 text-gray-400">Critical</p>
          <h2 className="mt-2 text-5xl font-black text-red-500">
            {statistics.critical}
          </h2>
        </div>

        <div className="rounded-2xl border border-orange-500/30 bg-[#111827] p-6">
          <ShieldAlert className="text-orange-400" size={34}/>
          <p className="mt-4 text-gray-400">High</p>
          <h2 className="mt-2 text-5xl font-black text-orange-400">
            {statistics.high}
          </h2>
        </div>

        <div className="rounded-2xl border border-yellow-500/30 bg-[#111827] p-6">
          <ShieldAlert className="text-yellow-400" size={34}/>
          <p className="mt-4 text-gray-400">Medium</p>
          <h2 className="mt-2 text-5xl font-black text-yellow-400">
            {statistics.medium}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-500/30 bg-[#111827] p-6">
          <ShieldAlert className="text-green-400" size={34}/>
          <p className="mt-4 text-gray-400">Closed</p>
          <h2 className="mt-2 text-5xl font-black text-green-400">
            {statistics.closed}
          </h2>
        </div>

      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-700 text-left text-gray-400">

              <th className="pb-4">ID</th>
              <th>Threat</th>
              <th>Severity</th>
              <th>Hostname</th>
              <th>Status</th>
              <th>Created</th>

            </tr>

          </thead>

          <tbody>

            {alerts.map((alert) => (

              <tr
                key={alert.id}
                className="border-b border-[#1f2937] hover:bg-[#182233]"
              >

                <td className="py-5 font-semibold">
                  #{alert.id}
                </td>

                <td>{alert.title}</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      alert.severity === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : alert.severity === "High"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {alert.severity}
                  </span>

                </td>

                <td>{alert.hostname}</td>

                <td>{alert.status}</td>

                <td>
                  {new Date(alert.created_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}