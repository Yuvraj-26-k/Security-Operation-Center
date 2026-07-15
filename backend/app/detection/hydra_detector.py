import re
from datetime import datetime

from app.models.event import Event

HYDRA_PATTERN = re.compile(
    r"HYDRA:(?P<source>\S+):(?P<target>\S+):(?P<service>\S+)"
)


def detect_hydra(db, log: str):
    match = HYDRA_PATTERN.match(log)

    if not match:
        return None

    source = match.group("source")
    target = match.group("target")
    service = match.group("service")

    event = Event(
        timestamp=datetime.utcnow(),

        source_ip=source,
        destination_ip=target,

        country="Unknown",
        city="Unknown",
        latitude=0.0,
        longitude=0.0,

        hostname="LAB-HOST",
        username="unknown",
        operating_system="Unknown",

        process_name="hydra",

        protocol=service.upper(),
        port=22 if service.lower() == "ssh" else 21,

        event_type="Brute Force",

        severity="High",

        mitre_tactic="Credential Access",
        mitre_technique="T1110",

        cve="N/A",

        ioc=source,

        malware_family="None",

        risk_score=82,

        status="Open",

        description=f"Hydra brute force detected from {source} against {target} ({service})",
    )

    db.add(event)
    db.commit()
    db.refresh(event)

    return event