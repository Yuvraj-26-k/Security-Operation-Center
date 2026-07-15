export type Severity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export type EventType = {
  id: number;
  severity: Severity;
  title: string;
  source: string;
  country: string;
  time: string;
};

const titles = [
  "PowerShell Execution",
  "Beacon Detected",
  "Credential Dumping",
  "SQL Injection Attempt",
  "Ransomware Activity",
  "Brute Force Login",
  "Lateral Movement",
  "Encoded Command",
  "Privilege Escalation",
  "Suspicious Process",
  "C2 Communication",
  "DNS Tunneling",
];

const sources = [
  "Microsoft Defender",
  "CrowdStrike Falcon",
  "Sysmon",
  "Windows Security",
  "Elastic Agent",
  "Suricata",
  "Zeek",
  "Cisco Firewall",
];

const countries = [
  "Russia",
  "China",
  "Germany",
  "India",
  "Brazil",
  "United States",
  "Japan",
  "United Kingdom",
  "France",
  "Iran",
];

const severities: Severity[] = [
  "Critical",
  "High",
  "Medium",
  "Low",
];

let id = 1000;

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateEvent(): EventType {
  id++;

  return {
    id,
    severity: random(severities),
    title: random(titles),
    source: random(sources),
    country: random(countries),
    time: new Date().toLocaleTimeString(),
  };
}