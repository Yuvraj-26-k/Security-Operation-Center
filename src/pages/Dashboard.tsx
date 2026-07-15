import KPIGrid from "../components/dashboard/KPIGrid";
import ThreatOverview from "../components/dashboard/ThreatOverview";
import RecentEvents from "../components/dashboard/RecentEvents";
import MitreMatrix from "../components/dashboard/MitreMatrix";

import AttackMap from "../components/widgets/AttackMap";
import LiveTerminal from "../components/widgets/LiveTerminal";
import EndpointHealth from "../components/widgets/EndpointHealth";
import LiveClock from "../components/widgets/LiveClock";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-black text-white tracking-tight">
            Security Operations Center
          </h1>

          <p className="mt-3 text-lg text-gray-400">
            Enterprise Security Monitoring Dashboard
          </p>

        </div>

        <LiveClock />

      </div>

      {/* KPI */}

      <KPIGrid />

      {/* Threat Chart */}

      <ThreatOverview />

      {/* Map + Endpoint */}

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">

          <AttackMap />

        </div>

        <EndpointHealth />

      </div>

      {/* Feed + Terminal */}

      <div className="grid grid-cols-2 gap-6">

        <RecentEvents />

        <LiveTerminal />

      </div>

      {/* MITRE */}

      <MitreMatrix />

    </div>
  );
}