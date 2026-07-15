import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import client from "../api/client";
import websocketService from "../services1.0/websocket.service";

import type {
  DashboardContextType,
  DashboardResponse,
} from "../types/dashboard";

const DashboardContext = createContext<
  DashboardContextType | undefined
>(undefined);

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {
    try {
      const { data } =
        await client.get<DashboardResponse>(
          "/dashboard"
        );

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();

    websocketService.connect();

    const unsubscribe =
      websocketService.subscribe(() => {
        refresh();
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        loading,
        refresh,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context =
    useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboardContext must be used inside DashboardProvider."
    );
  }

  return context;
}