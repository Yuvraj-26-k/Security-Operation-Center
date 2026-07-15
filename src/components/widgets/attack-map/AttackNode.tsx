import { motion } from "framer-motion";

interface AttackNodeProps {
  x: number;
  y: number;
  color: string;
}

export default function AttackNode({
  x,
  y,
  color,
}: AttackNodeProps) {
  return (
    <g>

      {/* Pulse */}

      <motion.circle
        cx={x}
        cy={y}
        r={8}
        fill={color}
        opacity={0.25}
        animate={{
          r: [8, 20, 8],
          opacity: [0.35, 0.05, 0.35],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Middle Ring */}

      <motion.circle
        cx={x}
        cy={y}
        r={5}
        fill="transparent"
        stroke={color}
        strokeWidth={2}
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Core */}

      <circle
        cx={x}
        cy={y}
        r={3}
        fill={color}
      />

    </g>
  );
}