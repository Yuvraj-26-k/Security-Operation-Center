import random
from datetime import datetime

from app.attackmap.data.world_coordinates import WORLD_COORDINATES


ATTACK_TYPES = [
    "Ransomware",
    "SQL Injection",
    "Credential Stuffing",
    "Brute Force",
    "Data Exfiltration",
    "DNS Tunneling",
    "PowerShell Abuse",
    "Beacon Activity",
    "Reverse Shell",
    "Lateral Movement",
    "Privilege Escalation",
    "Command Injection",
]

SEVERITIES = [
    "Low",
    "Medium",
    "High",
    "Critical",
]

MITRE = [
    ("Initial Access", "T1190"),
    ("Execution", "T1059"),
    ("Persistence", "T1547"),
    ("Privilege Escalation", "T1068"),
    ("Credential Access", "T1110"),
    ("Discovery", "T1087"),
    ("Lateral Movement", "T1021"),
    ("Command and Control", "T1071"),
    ("Exfiltration", "T1041"),
]

TARGET_COUNTRIES = [
    "India",
    "United States",
    "Germany",
    "United Kingdom",
    "Japan",
    "Australia",
    "Singapore",
]


def random_ip():
    return ".".join(
        str(random.randint(1, 254))
        for _ in range(4)
    )


def generate_attack():

    source = random.choice(
        list(WORLD_COORDINATES.keys())
    )

    destination = random.choice(TARGET_COUNTRIES)

    while destination == source:
        destination = random.choice(TARGET_COUNTRIES)

    attacker = WORLD_COORDINATES[source]
    victim = WORLD_COORDINATES[destination]

    severity = random.choices(
        SEVERITIES,
        weights=[45, 30, 18, 7],
        k=1,
    )[0]

    tactic, technique = random.choice(MITRE)

    return {

        "id": random.randint(
            100000,
            999999,
        ),

        "timestamp": datetime.utcnow().isoformat(),

        "attack_type": random.choice(
            ATTACK_TYPES
        ),

        "severity": severity,

        "risk_score": {
            "Low": random.randint(15, 35),
            "Medium": random.randint(36, 60),
            "High": random.randint(61, 85),
            "Critical": random.randint(86, 100),
        }[severity],

        "mitre_tactic": tactic,
        "mitre_technique": technique,

        "source_ip": random_ip(),

        "destination_ip": random_ip(),

        "source_country": source,
        "source_city": attacker["city"],

        "destination_country": destination,
        "destination_city": victim["city"],

        "from": {

            "x": attacker["x"],
            "y": attacker["y"],

            "latitude": attacker["latitude"],
            "longitude": attacker["longitude"],

        },

        "to": {

            "x": victim["x"],
            "y": victim["y"],

            "latitude": victim["latitude"],
            "longitude": victim["longitude"],

        },

        "status": random.choice(
            [
                "Blocked",
                "Investigating",
                "Contained",
                "In Progress",
            ]
        ),

    }