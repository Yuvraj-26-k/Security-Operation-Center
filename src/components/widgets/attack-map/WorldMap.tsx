import { motion } from "framer-motion";

import worldMap from "../../../assets/world.svg";

import type { AttackEvent } from "../../../types/attack";

interface WorldMapProps {
  attacks: AttackEvent[];
}

export default function WorldMap({
  attacks,
}: WorldMapProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#07111d]">

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.15) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* World SVG */}

      <img
        src={worldMap}
        alt="World"
        className="pointer-events-none h-full w-full select-none opacity-40"
      />

      {/* Attack Overlay */}

      <svg
        viewBox="0 0 2000 857"
        className="absolute inset-0 h-full w-full"
      >
        {attacks.slice(0, 25).map((attack) => (
          <g key={attack.id}>

            {/* Animated Line */}

            <motion.line
              x1={attack.from.x}
              y1={attack.from.y}
              x2={attack.to.x}
              y2={attack.to.y}
              stroke={
                attack.severity === "Critical"
                  ? "#ef4444"
                  : attack.severity === "High"
                  ? "#f59e0b"
                  : "#06b6d4"
              }
              strokeWidth="2"
              strokeDasharray="8 8"
              animate={{
                strokeDashoffset: [16, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
            />

            {/* Source Pulse */}

            <motion.circle
              cx={attack.from.x}
              cy={attack.from.y}
              r="14"
              fill="#ef4444"
              opacity="0.18"
              animate={{
                r: [8, 18, 8],
                opacity: [0.25, 0.05, 0.25],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            />

            {/* Source */}

            <circle
              cx={attack.from.x}
              cy={attack.from.y}
              r="4"
              fill="#ef4444"
            />

            {/* Destination Pulse */}

            <motion.circle
              cx={attack.to.x}
              cy={attack.to.y}
              r="14"
              fill="#06b6d4"
              opacity="0.18"
              animate={{
                r: [8, 18, 8],
                opacity: [0.25, 0.05, 0.25],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            />

            {/* Destination */}

            <circle
              cx={attack.to.x}
              cy={attack.to.y}
              r="4"
              fill="#06b6d4"
            />

          </g>
        ))}
      </svg>

      {/* Bottom Left */}

      <div className="absolute bottom-5 left-5 rounded-xl border border-cyan-500/20 bg-[#0B1220]/90 p-4 backdrop-blur-xl">

        <h3 className="text-xs uppercase tracking-widest text-gray-500">
          Active Streams
        </h3>

        <p className="mt-2 text-3xl font-black text-cyan-400">
          {attacks.length}
        </p>

      </div>

      {/* Bottom Right */}

      <div className="absolute bottom-5 right-5 rounded-xl border border-red-500/20 bg-[#0B1220]/90 p-4 backdrop-blur-xl">

        <h3 className="text-xs uppercase tracking-widest text-gray-500">
          Critical
        </h3>

        <p className="mt-2 text-3xl font-black text-red-400">
          {
            attacks.filter(
              (x) => x.severity === "Critical"
            ).length
          }
        </p>

      </div>

    </div>
  );
}