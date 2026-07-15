import re
from datetime import datetime

from app.models.event import Event

SQLMAP_PATTERN = re.compile(
    r"SQLMAP:(?P<source>\S+):(?P<target>\S+)"
)


def detect_sqlmap(db, log: str):

    match = SQLMAP_PATTERN.match(log)

    if not match:
        return None

    source = match.group("source")
    target = match.group("target")

    event = Event(
        timestamp=datetime.utcnow(),

        source_ip=source,
        destination_ip=target,

        country="Unknown",
        city="Unknown",
        latitude=0.0,
        longitude=0.0,

        hostname="WEB-SERVER",
        username="unknown",
        operating_system="Linux",

        process_name="sqlmap",

        protocol="HTTP",
        port=80,

        event_type="SQL Injection",

        severity="Critical",

        mitre_tactic="Initial Access",
        mitre_technique="T1190",

        cve="N/A",

        ioc=source,

        malware_family="None",

        risk_score=95,

        status="Open",

        description=f"SQLMap attack detected from {source} against {target}",
    )

    db.add(event)
    db.commit()
    db.refresh(event)

    return event