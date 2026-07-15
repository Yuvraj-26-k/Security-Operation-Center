from collections import defaultdict
from datetime import datetime, timedelta

INCIDENTS = defaultdict(list)


def correlate(event):

    key = event.source_ip

    INCIDENTS[key].append(event)

    now = datetime.utcnow()

    INCIDENTS[key] = [
        e for e in INCIDENTS[key]
        if now - e.timestamp < timedelta(minutes=5)
    ]

    chain = [e.event_type for e in INCIDENTS[key]]

    if (
        "Port Scan" in chain
        and "Brute Force" in chain
    ):
        return {
            "severity": "Critical",
            "title": "Attack Chain Detected",
            "description":
                "Port Scan followed by Brute Force"
        }

    return None