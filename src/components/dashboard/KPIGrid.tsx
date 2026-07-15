import {
  Shield,
  AlertTriangle,
  Server,
  Globe,
} from "lucide-react";

import StatCard from "../widgets/StatCard";
import useDashboard from "../../hooks/useDashboard";

export default function KPIGrid() {
  const { overview } = useDashboard();

  if (!overview) {
    return (
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Critical Alerts"
          value="0"
          icon={AlertTriangle}
          color="#ef4444"
        />

        <StatCard
          title="Protected Endpoints"
          value="0"
          icon={Shield}
          color="#06b6d4"
        />

        <StatCard
          title="Events / Minute"
          value="0"
          icon={Server}
          color="#f59e0b"
        />

        <StatCard
          title="Security Score"
          value="0%"
          icon={Globe}
          color="#22c55e"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6">

      <StatCard
        title="Critical Alerts"
        value={String(overview.critical ?? 0)}
        icon={AlertTriangle}
        color="#ef4444"
      />

      <StatCard
        title="Protected Endpoints"
        value={String(overview.protected_endpoints ?? 0)}
        icon={Shield}
        color="#06b6d4"
      />

      <StatCard
        title="Events / Minute"
        value={String(overview.events_per_minute ?? 0)}
        icon={Server}
        color="#f59e0b"
      />

      <StatCard
        title="Security Score"
        value={`${overview.security_score ?? 0}%`}
        icon={Globe}
        color="#22c55e"
      />

    </div>
  );
}