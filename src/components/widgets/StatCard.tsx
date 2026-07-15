import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import AnimatedCounter from "./AnimatedCounter";

type Props = {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: Props) {
  const numericValue = Number(
    value.replace("%", "").replace(",", "")
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="
      relative
      overflow-hidden
      rounded-2xl
      border
      border-cyan-500/20
      bg-gradient-to-br
      from-[#121A28]
      to-[#0A111C]
      p-6
      shadow-xl
    "
    >
      <div className="absolute right-[-50px] top-[-50px] h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex justify-between">

        <div>

          <p className="uppercase tracking-[3px] text-xs text-gray-400">
            {title}
          </p>

          <div className="mt-4 flex items-end gap-1">

            <span
              className="text-5xl font-black"
              style={{ color }}
            >
              <AnimatedCounter
                value={numericValue}
              />
            </span>

            {value.includes("%") && (
              <span
                className="text-3xl font-black"
                style={{ color }}
              >
                %
              </span>
            )}

          </div>

          <div className="mt-6 flex items-center gap-2">

            <TrendingUp
              size={18}
              className="text-green-400"
            />

            <span className="text-green-400 text-sm font-semibold">
              +12.8%
            </span>

          </div>

        </div>

        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="rounded-2xl p-5"
          style={{
            background: `${color}20`,
          }}
        >

          <Icon
            size={34}
            color={color}
          />

        </motion.div>

      </div>

      <div className="relative z-10 mt-8">

        <div className="flex justify-between text-xs text-gray-500">

          <span>Health</span>

          <span>Excellent</span>

        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#1F2937]">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: "88%",
            }}
            transition={{
              duration: 1,
            }}
            className="h-full rounded-full"
            style={{
              background: color,
            }}
          />

        </div>

      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="h-2 w-2 rounded-full"
          style={{
            background: color,
          }}
        />

        <span className="text-xs text-gray-500">
          LIVE
        </span>

      </div>

    </motion.div>
  );
}