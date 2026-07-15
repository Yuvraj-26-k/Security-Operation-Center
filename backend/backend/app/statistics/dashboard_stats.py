from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.event import Event


class DashboardStats:

    def build(self, db: Session):

        events = db.query(Event).all()

        total = len(events)

        critical = len(
            [e for e in events if e.severity == "Critical"]
        )

        high = len(
            [e for e in events if e.severity == "High"]
        )

        medium = len(
            [e for e in events if e.severity == "Medium"]
        )

        low = len(
            [e for e in events if e.severity == "Low"]
        )

        now = datetime.utcnow()

        minute = now - timedelta(minutes=1)

        recent = [
            e
            for e in events
            if e.timestamp >= minute
        ]

        events_per_minute = len(recent)

        protected_hosts = len(
            set(e.hostname for e in events)
        )

        active_threats = len(
            [
                e
                for e in events
                if e.status == "Open"
            ]
        )

        risk = 100

        risk -= critical * 8

        risk -= high * 4

        risk -= medium * 2

        risk = max(risk, 0)

        return {

            "overview": {

                "total_events": total,

                "critical": critical,

                "high": high,

                "medium": medium,

                "low": low,

                "events_per_minute": events_per_minute,

                "protected_endpoints": protected_hosts,

                "security_score": risk,

                "active_threats": active_threats,

            }

        }


dashboard_stats = DashboardStats()