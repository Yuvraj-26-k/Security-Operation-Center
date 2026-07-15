from app.database.db import SessionLocal
from app.models.event import Event
from app.sysmon.ingest import ingestor
from datetime import datetime


class SysmonDatabaseWriter:

    def sync(self):

        db = SessionLocal()

        try:

            events = ingestor.collect()

            for item in events:

                image = (
                    item["image"] or ""
                ).lower()

                command = (
                    item["command_line"] or ""
                ).lower()

                event_type = None
                severity = None
                tactic = None
                technique = None
                risk = None

                # ------------------------
                # Nmap Detection
                # ------------------------
                if image.endswith("nmap.exe"):

                    event_type = "Port Scan"
                    severity = "Medium"
                    tactic = "Discovery"
                    technique = "T1046"
                    risk = 75

                # ------------------------
                # Encoded PowerShell Detection
                # ------------------------
                elif (
                    image.endswith("powershell.exe")
                    and "-enc" in command
                ):

                    event_type = "Encoded PowerShell"
                    severity = "Critical"
                    tactic = "Execution"
                    technique = "T1059.001"
                    risk = 95

                else:
                    continue

                exists = (
                  db.query(Event)
                     .filter(
                     Event.description == item["message"],
                     Event.process_name == item["image"],
                     ) 
                       .first()
                   )

                if exists:
                  continue

                event = Event(
                    
                    timestamp=datetime.now().astimezone(),

                    source_ip="LOCALHOST",

                    destination_ip="LOCALHOST",

                    country="Local",

                    city="Windows",

                    latitude=0,

                    longitude=0,

                    hostname="WINDOWS-PC",

                    username=item["user"],

                    operating_system="Windows",

                    process_name=item["image"],

                    protocol="LOCAL",

                    port=0,

                    event_type=event_type,

                    severity=severity,

                    mitre_tactic=tactic,

                    mitre_technique=technique,

                    cve="",

                    ioc=item["image"],

                    malware_family="",

                    risk_score=risk,

                    status="Open",

                    description=item["message"],

                )

                db.add(event)

            db.commit()

        finally:

            db.close()


writer = SysmonDatabaseWriter()