from pathlib import Path
import json

LOG_DIRECTORY = Path("logs")


def collect():

    events = []

    for file in LOG_DIRECTORY.glob("*.json"):

        try:

            with open(file, "r", encoding="utf-8") as f:

                data = json.load(f)

                if isinstance(data, list):
                    events.extend(data)

                else:
                    events.append(data)

        except Exception:
            pass

    return events