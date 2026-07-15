import { useDashboardContext } from "../contexts/DashboardContext";

export default function useDashboard() {
  const {
    dashboard,
    loading,
    refresh,
  } = useDashboardContext();

  return {
    dashboard,
    loading,
    refresh,

    overview: dashboard?.overview,

    recentEvents:
      dashboard?.recent_events ?? [],

    severityDistribution:
      dashboard?.severity_distribution ?? {},

    topCountries:
      dashboard?.top_countries ?? [],

    topAttackTypes:
      dashboard?.top_attack_types ?? [],
  };
}