import { motion } from "framer-motion";
import { Shield, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050B14]">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute bottom-[-250px] right-[-200px] h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[180px]" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

      </div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative z-10 w-full max-w-md"
      >

        <div className="rounded-3xl border border-cyan-500/20 bg-[#111827]/80 p-10 shadow-[0_0_60px_rgba(34,211,238,.15)] backdrop-blur-xl">

          <div className="mb-10 text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/15">

              <Shield
                size={40}
                className="text-cyan-400"
              />

            </div>

            <h1 className="text-5xl font-black tracking-wider text-cyan-400">
              SentinelSOC
            </h1>

            <p className="mt-3 text-gray-400">
              Enterprise Security Operations Center
            </p>

          </div>

          <div className="space-y-5">

            <div className="relative">

              <User
                size={18}
                className="absolute left-4 top-4 text-cyan-400"
              />

              <input
                type="text"
                placeholder="Operator ID"
                className="w-full rounded-xl border border-cyan-500/20 bg-[#0B1220] py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-cyan-400"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-cyan-500/20 bg-[#0B1220] py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => navigate("/dashboard")}
              className="mt-4 w-full rounded-xl bg-cyan-500 py-3 font-bold text-black transition hover:bg-cyan-400"
            >
              Authenticate
            </motion.button>

          </div>

          <div className="mt-8 border-t border-cyan-500/10 pt-6">

            <div className="flex items-center justify-between text-sm">

              <span className="text-gray-500">
                Build
              </span>

              <span className="text-cyan-400">
                Enterprise v2.0
              </span>

            </div>

            <div className="mt-3 flex items-center justify-between text-sm">

              <span className="text-gray-500">
                Status
              </span>

              <span className="flex items-center gap-2 text-green-400">

                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                Secure

              </span>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
}