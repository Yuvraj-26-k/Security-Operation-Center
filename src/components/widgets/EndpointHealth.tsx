import {
  Monitor,
  Server,
  Laptop,
  ShieldCheck,
  Wifi,
  WifiOff,
} from "lucide-react";

const endpoints = [
  {
    icon: Monitor,
    name: "Windows",
    online: 186,
    total: 194,
    color: "bg-cyan-500",
  },
  {
    icon: Laptop,
    name: "Linux",
    online: 34,
    total: 36,
    color: "bg-green-500",
  },
  {
    icon: Server,
    name: "macOS",
    online: 27,
    total: 29,
    color: "bg-yellow-500",
  },
];

export default function EndpointHealth() {
  return (
    <div className="cyber-card rounded-2xl p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Endpoint Health
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Device protection overview
          </p>

        </div>

        <ShieldCheck
          className="text-green-400"
          size={28}
        />

      </div>

      <div className="mt-8 flex justify-center">

        <div className="relative">

          <div className="flex h-44 w-44 items-center justify-center rounded-full border-[12px] border-cyan-500">

            <div className="text-center">

              <h2 className="text-5xl font-black text-cyan-400">
                92%
              </h2>

              <p className="text-sm text-gray-400">
                Protected
              </p>

            </div>

          </div>

          <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500">

            <ShieldCheck
              size={20}
              className="text-white"
            />

          </div>

        </div>

      </div>

      <div className="mt-8 space-y-6">

        {endpoints.map((item) => {

          const Icon = item.icon;

          const percent = Math.round(
            (item.online / item.total) * 100
          );

          return (

            <div key={item.name}>

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <Icon
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="font-medium">
                    {item.name}
                  </span>

                </div>

                <span className="text-sm text-gray-400">

                  {item.online}/{item.total}

                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#1E293B]">

                <div
                  className={`h-full ${item.color}`}
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-[#0B1220] p-4">

          <div className="flex items-center gap-3">

            <Wifi className="text-green-400" />

            <div>

              <h3 className="text-3xl font-black text-green-400">
                247
              </h3>

              <p className="text-xs text-gray-400">
                Online
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-xl bg-[#0B1220] p-4">

          <div className="flex items-center gap-3">

            <WifiOff className="text-red-500" />

            <div>

              <h3 className="text-3xl font-black text-red-500">
                15
              </h3>

              <p className="text-xs text-gray-400">
                Offline
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}