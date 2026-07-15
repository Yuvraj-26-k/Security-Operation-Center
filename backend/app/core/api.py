from collections import Counter

from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.event import Event


def dashboard(db: Session):

    events = db.query(Event).all()

    severity = Counter(e.severity for e in events)
    attacks = Counter(e.event_type for e in events)
    countries = Counter(e.country for e in events)

    return {

        "overview": {

            "total_events": len(events),

            "critical": severity.get("Critical", 0),

            "high": severity.get("High", 0),

            "medium": severity.get("Medium", 0),

            "low": severity.get("Low", 0),

        },

        "severity_distribution": severity,

        "top_attack_types": attacks.most_common(10),

        "top_countries": countries.most_common(10),

    }


def events(db: Session):

    return (

        db.query(Event)

        .order_by(Event.id.desc())

        .limit(200)

        .all()

    )