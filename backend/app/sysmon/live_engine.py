from app.sysmon.database_writer import writer
from app.websocket.manager import manager
from app.database.db import SessionLocal
from app.models.event import Event

import asyncio
import time


class LiveEngine:

    def __init__(self):

        self.last_id = 0

    def run(self):

        while True:

            writer.sync()

            db = SessionLocal()

            try:

                newest = (
                    db.query(Event)
                    .order_by(Event.id.desc())
                    .first()
                )

                if (
                    newest
                    and newest.id != self.last_id
                ):

                    self.last_id = newest.id

                    if manager.active_connections:

                        asyncio.run(
                            manager.broadcast(
                                {

                                    "id": newest.id,

                                    "timestamp": newest.timestamp.isoformat(),

                                    "source_ip": newest.source_ip,

                                    "destination_ip": newest.destination_ip,

                                    "event_type": newest.event_type,

                                    "severity": newest.severity,

                                    "hostname": newest.hostname,

                                }

                            )

                        )

            finally:

                db.close()

            time.sleep(2)


live_engine = LiveEngine()