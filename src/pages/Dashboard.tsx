import KPIGrid from "../components/dashboard/KPIGrid";
import ThreatOverview from "../components/dashboard/ThreatOverview";
import RecentEvents from "../components/dashboard/RecentEvents";


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

      

      {/* Feed + Terminal */}

      
      <RecentEvents />

      {/* MITRE */}

     

    </div>
  );
}