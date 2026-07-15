import {
  Terminal,
} from "lucide-react";

const logs = [
  {
    level: "INFO",
    color: "text-cyan-400",
    message: "Firewall initialized successfully.",
  },
  {
    level: "WARNING",
    color: "text-yellow-400",
    message: "Port scan detected from 185.77.21.8",
  },
  {
    level: "CRITICAL",
    color: "text-red-500",
    message: "Ransomware behavior blocked on FINANCE-PC",
  },
  {
    level: "INFO",
    color: "text-green-400",
    message: "CrowdStrike Falcon quarantined malware.",
  },
  {
    level: "WARNING",
    color: "text-orange-400",
    message: "PowerShell encoded command executed.",
  },
  {
    level: "INFO",
    color: "text-cyan-400",
    message: "Sigma rule matched T1059.001",
  },
  {
    level: "INFO",
    color: "text-green-400",
    message: "MITRE ATT&CK mapping completed.",
  },
  {
    level: "CRITICAL",
    color: "text-red-500",
    message: "Credential dumping attempt detected.",
  },
  {
    level: "INFO",
    color: "text-cyan-400",
    message: "Threat intelligence feed updated.",
  },
];

export default function LiveTerminal() {
  return (
    <div className="cyber-card rounded-2xl p-6">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Terminal
            size={26}
            className="text-cyan-400"
          />

          <div>

            <h2 className="text-2xl font-bold">
              Live SIEM Console
            </h2>

            <p className="text-sm text-gray-400">
              Real-time security events
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">

          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

          <span className="text-xs font-semibold text-green-400">
            STREAMING
          </span>

        </div>

      </div>

      <div className="h-[420px] overflow-y-auto rounded-xl border border-cyan-500/10 bg-black p-4 font-mono text-sm">

        {logs.map((log, index) => (

          <div
            key={index}
            className="mb-3 flex gap-3"
          >

            <span className="text-gray-500">
              {`09:${10 + index}:3${index}`}
            </span>

            <span className={log.color}>
              [{log.level}]
            </span>

            <span className="text-gray-300">
              {log.message}
            </span>

          </div>

        ))}

        <div className="mt-4 flex items-center">

          <span className="text-green-400">
            analyst@soc
          </span>

          <span className="mx-2 text-gray-500">
            $
          </span>

          <span className="h-5 w-2 animate-pulse bg-cyan-400" />

        </div>

      </div>

    </div>
  );
}