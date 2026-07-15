import { useEffect, useMemo, useState } from "react";

import siemService from "../services1.0/siem.service";

export default function useSIEM() {

  const [events, setEvents] = useState<any[]>([]);

  const [criticalAlerts, setCriticalAlerts] = useState(0);

  const [eventsPerMinute, setEventsPerMinute] = useState(0);

  const [securityScore, setSecurityScore] = useState(0);

  const [onlineEndpoints, setOnlineEndpoints] = useState(247);

  useEffect(() => {

    loadDashboard();

    const timer = setInterval(() => {

      loadDashboard();

    }, 3000);

    return () => clearInterval(timer);

  }, []);

  async function loadDashboard() {

    try {

      const dashboard =
        await siemService.getDashboard();

      setEvents(
        dashboard.recent_events
      );

      setCriticalAlerts(
        dashboard.overview.critical
      );

      setEventsPerMinute(
        dashboard.overview.total_events
      );

      setSecurityScore(

        Math.max(
          70,

          100 -
            dashboard.overview.critical * 2
        )

      );

    } catch (error) {

      console.error(error);

    }

  }

  return useMemo(

    () => ({

      events,

      criticalAlerts,

      eventsPerMinute,

      securityScore,

      onlineEndpoints,

    }),

    [

      events,

      criticalAlerts,

      eventsPerMinute,

      securityScore,

      onlineEndpoints,

    ]

  );

}