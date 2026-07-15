export interface Overview {
  total_events: number;

  critical: number;

  high: number;

  medium: number;

  low: number;

  protected_endpoints: number;

  security_score: number;

  events_per_minute: number;

  active_threats: number;
}

export interface DashboardResponse {
  overview: Overview;

  severity_distribution: Record<string, number>;

  top_countries: [string, number][];

  top_attack_types: [string, number][];

  recent_events: any[];
}

export interface DashboardContextType {
  dashboard: DashboardResponse | null;

  loading: boolean;

  refresh: () => Promise<void>;
}