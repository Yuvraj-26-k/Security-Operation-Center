export interface AttackLocation {
  x: number;
  y: number;

  latitude: number;
  longitude: number;
}

export interface AttackEvent {
  id: number;

  timestamp: string;

  attack_type: string;

  severity: "Low" | "Medium" | "High" | "Critical";

  risk_score: number;

  mitre_tactic: string;
  mitre_technique: string;

  source_ip: string;
  destination_ip: string;

  source_country: string;
  source_city: string;

  destination_country: string;
  destination_city: string;

  from: AttackLocation;

  to: AttackLocation;

  status: string;
}