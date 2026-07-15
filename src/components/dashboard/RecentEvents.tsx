import { useEffect, useState } from "react";

import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ServerCrash,
  Globe,
} from "lucide-react";

import useDashboard from "../../hooks/useDashboard";
import websocketService from "../../services1.0/websocket.service";

type EventItem = {
  id: number;
  timestamp: string;
  source_ip: string;
  destination_ip: string;
  country: string;
  city: string;
  event_type: string;
  severity: string;
  hostname: string;
};

const iconMap: Record<string, any> = {
  "Brute Force": AlertTriangle,
  "Credential Stuffing": ShieldAlert,
  "Password Spray": ShieldAlert,
  "Port Scan": Globe,
  "SQL Injection": Globe,
  "Cross Site Scripting": Globe,
  "Command Injection": Globe,
  "Reverse Shell": ServerCrash,
  "Beacon Detected": ServerCrash,
  "DNS Tunneling": Globe,
  "Data Exfiltration": ServerCrash,
  "Malware Execution": AlertTriangle,
  "Ransomware Activity": AlertTriangle,
  "Lateral Movement": ShieldAlert,
  "Privilege Escalation": ShieldAlert,
  "PowerShell Abuse": ShieldCheck,
};

const severityStyle = {
  Critical: {
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  High: {
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  Medium: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  Low: {
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
};

export default function RecentEvents() {
  const { recentEvents } = useDashboard();

  const [events, setEvents] =
    useState<EventItem[]>([]);

  useEffect(() => {
    setEvents(
      recentEvents.slice(0, 15) as EventItem[]
    );
  }, [recentEvents]);

  useEffect(() => {
    const unsubscribe =
      websocketService.subscribe((event) => {
        setEvents((previous) =>
          [event, ...previous].slice(0, 15)
        );
      });

    return unsubscribe;
  }, []);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Live Security Feed
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Real-time SOC telemetry
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">

          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

          <span className="text-sm font-semibold text-green-400">
            LIVE
          </span>

        </div>

      </div>

      <div className="max-h-[560px] space-y-4 overflow-y-auto">

        {events.map((event) => {
          const Icon =
            iconMap[event.event_type] ??
            AlertTriangle;

          const style =
            severityStyle[
              event.severity as keyof typeof severityStyle
            ] ?? severityStyle.Low;

          return (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-xl border border-cyan-500/10 bg-[#0B1220] p-4 transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#142033]"
            >
              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.bg}`}
                >
                  <Icon
                    size={22}
                    className={style.color}
                  />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    {event.event_type}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {event.hostname} • {event.city},{" "}
                    {event.country}
                  </p>

                  <p className="mt-1 text-xs text-cyan-400">
                    {event.source_ip} →{" "}
                    {event.destination_ip}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <div
                  className={`font-semibold ${style.color}`}
                >
                  {event.severity}
                </div>

                <div className="text-xs text-gray-500">
                  {new Date(
                    event.timestamp
                  ).toLocaleTimeString()}
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}