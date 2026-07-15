import re
from datetime import datetime

from app.models.event import Event

PATTERN = re.compile(
    r"REVERSE:(?P<source>\S+):(?P<target>\S+)"
)


def detect_reverse_shell(db, log: str):

    match = PATTERN.match(log)

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

        hostname="SERVER",
        username="SYSTEM",
        operating_system="Windows",

        process_name="cmd.exe",

        protocol="TCP",
        port=4444,

        event_type="Reverse Shell",

        severity="Critical",

        mitre_tactic="Execution",
        mitre_technique="T1059",

        cve="N/A",

        ioc=source,

        malware_family="None",

        risk_score=99,

        status="Open",

        description=f"Reverse shell detected from {source} to {target}",
    )

    db.add(event)
    db.commit()
    db.refresh(event)

    return event