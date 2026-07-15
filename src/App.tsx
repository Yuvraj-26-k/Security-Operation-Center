import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Incidents from "./pages/Incidents";
import Endpoints from "./pages/Endpoints";
import Network from "./pages/Network";
import Logs from "./pages/Logs";
import ThreatIntel from "./pages/ThreatIntel";
import Malware from "./pages/Malware";
import Vulnerability from "./pages/Vulnerability";
import Rules from "./pages/Rules";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/alerts" element={<Alerts />} />

        <Route path="/incidents" element={<Incidents />} />

        <Route path="/endpoints" element={<Endpoints />} />

        <Route path="/network" element={<Network />} />

        <Route path="/logs" element={<Logs />} />

        <Route path="/threat-intel" element={<ThreatIntel />} />

        <Route path="/malware" element={<Malware />} />

        <Route path="/vulnerability" element={<Vulnerability />} />

        <Route path="/rules" element={<Rules />} />

        <Route path="/reports" element={<Reports />} />

      </Route>

    </Routes>
  );
}

export default App;