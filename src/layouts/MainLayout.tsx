import { Outlet } from "react-router-dom";

import Sidebar from "../components/widgets/Sidebar";
import TopBar from "../components/widgets/TopBar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#060B14] text-white">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <TopBar />

        <main className="flex-1 overflow-y-auto p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}