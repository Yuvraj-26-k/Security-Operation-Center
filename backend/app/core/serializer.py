from app.models.event import Event


def serialize(event: Event):

    return {

        "id": event.id,

        "timestamp": event.timestamp.isoformat(),

        "source_ip": event.source_ip,

        "destination_ip": event.destination_ip,

        "country": event.country,

        "city": event.city,

        "latitude": event.latitude,

        "longitude": event.longitude,

        "hostname": event.hostname,

        "username": event.username,

        "operating_system": event.operating_system,

        "process_name": event.process_name,

        "protocol": event.protocol,

        "port": event.port,

        "event_type": event.event_type,

        "severity": event.severity,

        "mitre_tactic": event.mitre_tactic,

        "mitre_technique": event.mitre_technique,

        "cve": event.cve,

        "ioc": event.ioc,

        "malware_family": event.malware_family,

        "risk_score": event.risk_score,

        "status": event.status,

        "description": event.description,

    }