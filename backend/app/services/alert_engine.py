from app.services.correlation_engine import correlate
from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.event import Event


ALERT_THRESHOLD = 70


def process_event(
    db: Session,
    event: Event,
) -> Alert | None:
    """
    Convert a security event into an alert
    if it exceeds the configured threshold.
    """

    # Ignore low-risk events
    if event.risk_score < ALERT_THRESHOLD:
        return None

    # Prevent duplicate alerts
    existing = (
        db.query(Alert)
        .filter(Alert.event_id == event.id)
        .first()
    )

    if existing:
        return existing

    title = (
        f"{event.severity} "
        f"{event.event_type} "
        f"detected"
    )

    alert = Alert(
        title=title,

        severity=event.severity,

        status="Open",

        event_type=event.event_type,

        mitre_tactic=event.mitre_tactic,

        mitre_technique=event.mitre_technique,

        source_ip=event.source_ip,

        destination_ip=event.destination_ip,

        hostname=event.hostname,

        username=event.username,

        risk_score=event.risk_score,

        assigned_to=None,

        notes=None,

        false_positive=False,

        event_id=event.id,
    )

    db.add(alert)
    
    incident = correlate(event)

    if incident:
     print("=" * 60)
     print("CRITICAL INCIDENT")
     print(incident["title"])
     print(incident["description"])
     print("=" * 60)

    db.commit()

    db.refresh(alert)

    return alert