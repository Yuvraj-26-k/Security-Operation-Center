from datetime import datetime

from app.models.event import Event


def detect_nmap(db, log: str):

    text = log.lower()

    if "nmap.exe" not in text:
        return None

    target = "Unknown"

    for line in log.splitlines():

        if line.strip().startswith("CommandLine:"):

            command = line.split(":", 1)[1].strip()

            parts = command.replace('"', "").split()

            if len(parts) >= 2:

                target = parts[-1]

            break

    event = Event(

        timestamp=datetime.utcnow(),

        source_ip="LOCALHOST",

        destination_ip=target,

        country="Local",

        city="Windows",

        latitude=0.0,

        longitude=0.0,

        hostname="WINDOWS-PC",

        username="Current User",

        operating_system="Windows",

        process_name="nmap.exe",

        protocol="TCP",

        port=0,

        event_type="Port Scan",

        severity="Medium",

        mitre_tactic="Discovery",

        mitre_technique="T1046",

        cve="",

        ioc=target,

        malware_family="",

        risk_score=60,

        status="Open",

        description=f"Nmap execution detected against {target}",

    )

    db.add(event)

    db.commit()

    db.refresh(event)

    return event