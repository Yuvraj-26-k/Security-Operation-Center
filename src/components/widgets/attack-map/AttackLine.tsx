import { motion } from "framer-motion";

interface AttackLineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  severity: "Low" | "Medium" | "High" | "Critical";
}

export default function AttackLine({
  fromX,
  fromY,
  toX,
  toY,
  severity,
}: AttackLineProps) {
  const color =
    severity === "Critical"
      ? "#ef4444"
      : severity === "High"
      ? "#f59e0b"
      : severity === "Medium"
      ? "#06b6d4"
      : "#22c55e";

  return (
    <g>
      {/* Main Route */}

      <motion.line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={color}
        strokeWidth={2}
        strokeDasharray="10 10"
        animate={{
          strokeDashoffset: [20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />

      {/* Moving Packet */}

      <motion.circle
        r={4}
        fill={color}
        animate={{
          cx: [fromX, toX],
          cy: [fromY, toY],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Destination Glow */}

      <motion.circle
        cx={toX}
        cy={toY}
        r={7}
        fill={color}
        opacity={0.18}
        animate={{
          r: [7, 18, 7],
          opacity: [0.3, 0.05, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      />
    </g>
  );
}