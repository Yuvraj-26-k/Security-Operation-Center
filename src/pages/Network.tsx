import {
  Network,
  Wifi,
  Router,
  Shield,
} from "lucide-react";

const devices = [
  {
    name: "Core Router",
    ip: "192.168.1.1",
    traffic: "3.2 Gbps",
    status: "Healthy",
  },
  {
    name: "Firewall",
    ip: "192.168.1.254",
    traffic: "1.8 Gbps",
    status: "Protected",
  },
  {
    name: "VPN Gateway",
    ip: "10.0.0.1",
    traffic: "950 Mbps",
    status: "Healthy",
  },
  {
    name: "Web Server",
    ip: "192.168.1.80",
    traffic: "630 Mbps",
    status: "Warning",
  },
];

export default function NetworkPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black text-white">
          Network Monitoring
        </h1>

        <p className="mt-2 text-gray-400">
          Live infrastructure overview
        </p>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">

          <Network className="text-cyan-400" size={34} />

          <p className="mt-4 text-gray-400">
            Active Devices
          </p>

          <h2 className="mt-2 text-5xl font-black text-cyan-400">
            94
          </h2>

        </div>

        <div className="rounded-2xl border border-green-500/20 bg-[#111827] p-6">

          <Router className="text-green-400" size={34} />

          <p className="mt-4 text-gray-400">
            Routers
          </p>

          <h2 className="mt-2 text-5xl font-black text-green-400">
            8
          </h2>

        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-[#111827] p-6">

          <Wifi className="text-yellow-400" size={34} />

          <p className="mt-4 text-gray-400">
            Connections
          </p>

          <h2 className="mt-2 text-5xl font-black text-yellow-400">
            512
          </h2>

        </div>

        <div className="rounded-2xl border border-red-500/20 bg-[#111827] p-6">

          <Shield className="text-red-500" size={34} />

          <p className="mt-4 text-gray-400">
            Blocked
          </p>

          <h2 className="mt-2 text-5xl font-black text-red-500">
            28
          </h2>

        </div>

      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-700 text-left text-gray-400">

              <th className="pb-4">Device</th>
              <th>IP Address</th>
              <th>Traffic</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {devices.map((device) => (

              <tr
                key={device.name}
                className="border-b border-[#1f2937] hover:bg-[#182233]"
              >

                <td className="py-5 font-semibold">
                  {device.name}
                </td>

                <td>{device.ip}</td>

                <td>{device.traffic}</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      device.status === "Healthy"
                        ? "bg-green-500/20 text-green-400"
                        : device.status === "Protected"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {device.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}