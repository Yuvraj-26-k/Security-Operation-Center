from app.sysmon.rules.process_create import PROCESS_RULES
from app.sysmon.rules.network_connection import NETWORK_RULES
from app.sysmon.rules.powershell import POWERSHELL_PATTERNS


class SysmonDetector:

    def detect(self, event):

        message = event["message"].lower()

        for process, rule in PROCESS_RULES.items():

            if process.lower() in message:

                return {

                    "event_type": rule[0],

                    "severity": rule[1],

                    "mitre_tactic": rule[2],

                    "mitre_technique": rule[3],

                    "risk_score": rule[4],

                }

        for pattern in POWERSHELL_PATTERNS:

            if pattern.lower() in message:

                return {

                    "event_type": "PowerShell Abuse",

                    "severity": "Critical",

                    "mitre_tactic": "Execution",

                    "mitre_technique": "T1059.001",

                    "risk_score": 98,

                }

        for port, rule in NETWORK_RULES.items():

            if str(port) in message:

                return {

                    "event_type": rule[0],

                    "severity": rule[1],

                    "mitre_tactic": rule[2],

                    "mitre_technique": rule[3],

                    "risk_score": rule[4],

                }

        return None


detector = SysmonDetector()