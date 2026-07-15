import { motion } from "framer-motion";
import {
  Globe,
  Activity,
  ShieldAlert,
  Radio,
} from "lucide-react";

const nodes = [
  { x: 190, y: 135 },
  { x: 260, y: 165 },
  { x: 430, y: 145 },
  { x: 520, y: 180 },
  { x: 650, y: 150 },
  { x: 760, y: 190 },
  { x: 820, y: 140 },
];

const routes = [
  { x1: 190, y1: 135, x2: 430, y2: 145 },
  { x1: 430, y1: 145, x2: 650, y2: 150 },
  { x1: 260, y1: 165, x2: 520, y2: 180 },
  { x1: 520, y1: 180, x2: 820, y2: 140 },
  { x1: 650, y1: 150, x2: 760, y2: 190 },
];

export default function AttackMap() {
  return (
    <div className="cyber-card rounded-2xl p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-black">
            Global Attack Monitor
          </h2>

          <p className="mt-1 text-gray-400">
            Live cyber threat visualization
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

          <Radio
            size={15}
            className="animate-pulse text-green-400"
          />

          <span className="font-semibold text-green-400">
            LIVE
          </span>

        </div>

      </div>

      <div className="relative h-[430px] overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#07111d]">

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.12) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <svg
          viewBox="0 0 1000 430"
          className="absolute inset-0 h-full w-full"
        >

          {/* Continents */}

          <path
            d="M110 130 L210 80 L310 90 L370 120 L350 170 L260 180 L180 160 Z"
            fill="#103046"
            stroke="#06b6d4"
            opacity=".45"
          />

          <path
            d="M330 230 L400 190 L460 220 L430 320 L350 290 Z"
            fill="#103046"
            stroke="#06b6d4"
            opacity=".45"
          />

          <path
            d="M430 110 L620 90 L720 120 L760 180 L700 230 L520 200 L430 160 Z"
            fill="#103046"
            stroke="#06b6d4"
            opacity=".45"
          />

          <path
            d="M690 250 L770 230 L820 280 L760 360 L690 330 Z"
            fill="#103046"
            stroke="#06b6d4"
            opacity=".45"
          />

          <path
            d="M830 120 L930 140 L900 220 L820 210 Z"
            fill="#103046"
            stroke="#06b6d4"
            opacity=".45"
          />

          {/* Attack Routes */}

          {routes.map((line, index) => (

            <motion.line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#06b6d4"
              strokeWidth="2"
              strokeDasharray="8 8"
              animate={{
                strokeDashoffset: [16, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "linear",
              }}
            />

          ))}

          {/* Attack Nodes */}

          {nodes.map((node, index) => (

            <g key={index}>

              <motion.circle
                cx={node.x}
                cy={node.y}
                r="12"
                fill="#ef4444"
                opacity=".25"
                animate={{
                  r: [8, 18, 8],
                  opacity: [.25, .05, .25],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: index * .2,
                }}
              />

              <circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill="#ef4444"
              />

            </g>

          ))}

        </svg>

        <div className="absolute bottom-5 left-5 rounded-xl bg-[#0B1220]/90 p-4 backdrop-blur">

          <div className="flex items-center gap-3">

            <Activity className="text-cyan-400" />

            <div>

              <h3 className="text-3xl font-black text-cyan-400">
                1,284
              </h3>

              <p className="text-xs text-gray-400">
                Events / Minute
              </p>

            </div>

          </div>

        </div>

        <div className="absolute bottom-5 right-5 rounded-xl bg-[#0B1220]/90 p-4 backdrop-blur">

          <div className="flex items-center gap-3">

            <ShieldAlert className="text-red-500" />

            <div>

              <h3 className="text-3xl font-black text-red-500">
                43
              </h3>

              <p className="text-xs text-gray-400">
                Active Threats
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-6 grid grid-cols-4 gap-4">

        {[
          ["Countries", "86"],
          ["Blocked", "12,487"],
          ["Critical", "43"],
          ["Intel Feeds", "27"],
        ].map(([title, value]) => (

          <motion.div
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            key={title}
            className="rounded-xl border border-cyan-500/20 bg-[#0B1220] p-4"
          >

            <p className="text-xs uppercase tracking-widest text-gray-500">
              {title}
            </p>

            <h3 className="mt-3 text-3xl font-black text-cyan-400">
              {value}
            </h3>

          </motion.div>

        ))}

      </div>

    </div>
  );
}