import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 h-screen bg-[#111827] border-r border-cyan-500/20">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-cyan-400">
              SentinelSOC
            </h1>

            <p className="text-xs text-gray-400 mt-1">
              Security Operations Center
            </p>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default MainLayout;