from collections import Counter
from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.event import Event


class DashboardStats:

    def build(self, db: Session):

        # ALL events
        events = (
            db.query(Event)
            .order_by(Event.id.desc())
            .all()
        )

        severity = Counter(
            e.severity for e in events
        )

        countries = Counter(
            e.country for e in events
        )

        attacks = Counter(
            e.event_type for e in events
        )

        total_events = len(events)

        minute = datetime.utcnow() - timedelta(minutes=1)

        events_per_minute = (
            db.query(Event)
            .filter(Event.timestamp >= minute)
            .count()
        )

        protected_endpoints = len(
            {
                e.hostname
                for e in events
            }
        )

        active_threats = sum(
            1
            for e in events
            if e.status == "Open"
        )

        security_score = max(
            0,
            100
            - severity.get("Critical", 0) * 8
            - severity.get("High", 0) * 4
            - severity.get("Medium", 0) * 2
            - severity.get("Low", 0),
        )

        recent_events = events[:20]

        return {

            "overview": {

                "total_events": total_events,

                "critical": severity.get(
                    "Critical",
                    0,
                ),

                "high": severity.get(
                    "High",
                    0,
                ),

                "medium": severity.get(
                    "Medium",
                    0,
                ),

                "low": severity.get(
                    "Low",
                    0,
                ),

                "events_per_minute": events_per_minute,

                "protected_endpoints": protected_endpoints,

                "security_score": security_score,

                "active_threats": active_threats,

            },

            "severity_distribution": dict(
                severity
            ),

            "top_countries": countries.most_common(
                10
            ),

            "top_attack_types": attacks.most_common(
                10
            ),

            "recent_events": [

                {

                    "id": e.id,

                    "timestamp": e.timestamp.isoformat(),

                    "source_ip": e.source_ip,

                    "destination_ip": e.destination_ip,

                    "country": e.country,

                    "city": e.city,

                    "event_type": e.event_type,

                    "severity": e.severity,

                    "hostname": e.hostname,

                }

                for e in recent_events

            ],

        }


dashboard_stats = DashboardStats()