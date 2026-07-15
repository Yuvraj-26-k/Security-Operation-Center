from pathlib import Path

from app.database.db import SessionLocal
from app.detection.registry import DETECTORS
from app.services.alert_engine import process_event

LOG_FILE = Path("logs/events.log")


class DetectionEngine:

    def __init__(self):
        self.position = 0

    def process(self):

        if not LOG_FILE.exists():
            return

        db = SessionLocal()

        try:

            with LOG_FILE.open(
                "r",
                encoding="utf-8",
            ) as file:

                file.seek(self.position)

                for line in file:

                    line = line.strip()

                    if not line:
                        continue

                    event = None

                    for detector in DETECTORS:

                        event = detector(
                            db,
                            line,
                        )

                        if event:
                            process_event(
                                db=db,
                                event=event,
                            )

                            break

                self.position = file.tell()

        finally:

            db.close()


engine = DetectionEngine()