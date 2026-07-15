import { useEffect, useRef, useState } from "react";

import type { AttackEvent } from "../types/attack";

const WS_URL = "ws://127.0.0.1:8000/ws/events";

function convertToMapPosition(
  latitude: number,
  longitude: number
) {
  return {
    x: ((longitude + 180) / 360) * 2000,
    y: ((90 - latitude) / 180) * 857,
  };
}

export default function useAttackMap() {
  const [connected, setConnected] = useState(false);

  const [attacks, setAttacks] = useState<AttackEvent[]>([]);

  const socketRef = useRef<WebSocket | null>(null);

  const reconnectTimer = useRef<number | null>(null);

  useEffect(() => {
    connect();

    return () => {
      socketRef.current?.close();

      if (reconnectTimer.current !== null) {
        window.clearTimeout(reconnectTimer.current);
      }
    };
  }, []);

  function connect() {
    const socket = new WebSocket(WS_URL);

    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
    };

    socket.onmessage = (message) => {
      try {
        const raw = JSON.parse(message.data);

        const source = convertToMapPosition(
          raw.latitude,
          raw.longitude
        );

        const destinations = [
  { x: 1750, y: 260 }, // India
  { x: 1050, y: 180 }, // Europe
  { x: 1450, y: 170 }, // Middle East
  { x: 1650, y: 330 }, // Australia
  { x: 700, y: 170 },  // USA
  { x: 900, y: 230 },  // South America
];

const destination =
  destinations[
    Math.floor(
      Math.random() * destinations.length
    )
  ];

        const attack: AttackEvent = {
          id: raw.id,

          timestamp: raw.timestamp,

          attack_type: raw.event_type,

          severity: raw.severity,

          risk_score: raw.risk_score,

          mitre_tactic: raw.mitre_tactic,

          mitre_technique: raw.mitre_technique,

          source_ip: raw.source_ip,

          destination_ip: raw.destination_ip,

          source_country: raw.country,

          source_city: raw.city,

         destination_country: "Protected Network",

         destination_city: "SentinelSOC",
         

          from: {
            x: source.x,
            y: source.y,
            latitude: raw.latitude,
            longitude: raw.longitude,
          },

          to: {
            x: destination.x,
            y: destination.y,
            latitude: 0,
            longitude: 0,
          },

          status: raw.status,
        };

        setAttacks((previous) => {
          const updated = [attack, ...previous];

          return updated.slice(0, 100);
        });
      } catch (error) {
        console.error(error);
      }
    };

    socket.onclose = () => {
      setConnected(false);

      reconnectTimer.current = window.setTimeout(() => {
        connect();
      }, 3000);
    };

    socket.onerror = () => {
      socket.close();
    };
  }

  return {
    connected,
    attacks,
    latestAttack: attacks[0] ?? null,
  };
}