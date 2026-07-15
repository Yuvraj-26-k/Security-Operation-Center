import {
  Bell,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Clock,
} from "lucide-react";

const notifications = [
  {
    icon: AlertTriangle,
    color: "text-red-500",
    title: "Critical ransomware detected",
    time: "2 min ago",
  },
  {
    icon: ShieldAlert,
    color: "text-orange-400",
    title: "PowerShell execution detected",
    time: "5 min ago",
  },
  {
    icon: ShieldCheck,
    color: "text-green-400",
    title: "Threat quarantined successfully",
    time: "12 min ago",
  },
  {
    icon: Clock,
    color: "text-cyan-400",
    title: "Threat intelligence updated",
    time: "18 min ago",
  },
];

export default function NotificationPanel() {
  return (
    <div className="absolute right-0 top-16 z-50 w-96 rounded-2xl border border-cyan-500/20 bg-[#111827] p-5 shadow-[0_0_35px_rgba(34,211,238,.15)]">

      <div className="mb-5 flex items-center gap-3">

        <Bell className="text-cyan-400" />

        <h2 className="text-xl font-bold">
          Notifications
        </h2>

      </div>

      <div className="space-y-3">

        {notifications.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="rounded-xl border border-cyan-500/10 bg-[#0B1220] p-4 transition hover:border-cyan-400"
            >

              <div className="flex gap-4">

                <Icon
                  className={item.color}
                  size={22}
                />

                <div>

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.time}
                  </p>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}