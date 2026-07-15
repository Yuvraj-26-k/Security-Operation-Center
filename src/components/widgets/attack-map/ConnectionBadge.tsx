import { Wifi, WifiOff } from "lucide-react";

interface ConnectionBadgeProps {
  connected: boolean;
}

export default function ConnectionBadge({
  connected,
}: ConnectionBadgeProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-md transition-all duration-300 ${
        connected
          ? "border-green-500/30 bg-green-500/10"
          : "border-red-500/30 bg-red-500/10"
      }`}
    >
      {connected ? (
        <Wifi
          size={16}
          className="animate-pulse text-green-400"
        />
      ) : (
        <WifiOff
          size={16}
          className="text-red-400"
        />
      )}

      <span
        className={`text-sm font-bold tracking-wide ${
          connected
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {connected ? "LIVE" : "OFFLINE"}
      </span>
    </div>
  );
}