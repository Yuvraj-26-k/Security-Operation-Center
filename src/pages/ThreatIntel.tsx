import {
  ShieldAlert,
  Globe,
  Bug,
  Database,
} from "lucide-react";

const cves = [
  {
    id: "CVE-2026-1001",
    product: "Apache HTTP Server",
    severity: "Critical",
    score: "9.8",
  },
  {
    id: "CVE-2026-1215",
    product: "Windows Server",
    severity: "High",
    score: "8.6",
  },
  {
    id: "CVE-2026-1411",
    product: "OpenSSH",
    severity: "Medium",
    score: "6.4",
  },
  {
    id: "CVE-2026-1519",
    product: "VMware ESXi",
    severity: "Critical",
    score: "9.9",
  },
];

export default function ThreatIntel() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black text-white">
          Threat Intelligence
        </h1>

        <p className="mt-2 text-gray-400">
          Latest global cyber intelligence feed
        </p>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="rounded-2xl bg-[#111827] border border-red-500/20 p-6">

          <ShieldAlert
            size={34}
            className="text-red-500"
          />

          <p className="mt-4 text-gray-400">
            Critical CVEs
          </p>

          <h2 className="mt-2 text-5xl font-black text-red-500">
            42
          </h2>

        </div>

        <div className="rounded-2xl bg-[#111827] border border-cyan-500/20 p-6">

          <Globe
            size={34}
            className="text-cyan-400"
          />

          <p className="mt-4 text-gray-400">
            Threat Sources
          </p>

          <h2 className="mt-2 text-5xl font-black text-cyan-400">
            18
          </h2>

        </div>

        <div className="rounded-2xl bg-[#111827] border border-yellow-500/20 p-6">

          <Bug
            size={34}
            className="text-yellow-400"
          />

          <p className="mt-4 text-gray-400">
            Malware Families
          </p>

          <h2 className="mt-2 text-5xl font-black text-yellow-400">
            67
          </h2>

        </div>

        <div className="rounded-2xl bg-[#111827] border border-green-500/20 p-6">

          <Database
            size={34}
            className="text-green-400"
          />

          <p className="mt-4 text-gray-400">
            IOC Records
          </p>

          <h2 className="mt-2 text-5xl font-black text-green-400">
            12.4K
          </h2>

        </div>

      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Latest Vulnerabilities
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-700 text-left text-gray-400">

              <th className="pb-4">CVE</th>
              <th>Product</th>
              <th>Severity</th>
              <th>CVSS</th>

            </tr>

          </thead>

          <tbody>

            {cves.map((cve) => (

              <tr
                key={cve.id}
                className="border-b border-[#1f2937] hover:bg-[#182233]"
              >

                <td className="py-5 font-semibold">
                  {cve.id}
                </td>

                <td>{cve.product}</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      cve.severity === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : cve.severity === "High"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {cve.severity}
                  </span>

                </td>

                <td>{cve.score}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}