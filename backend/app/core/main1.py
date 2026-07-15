import threading

from app.sysmon.worker import run as sysmon_worker
from app.sysmon.live_engine import live_engine


class SentinelSOC:

    def start(self):

        threading.Thread(
            target=sysmon_worker,
            daemon=True,
        ).start()

        threading.Thread(
            target=live_engine.run,
            daemon=True,
        ).start()


soc = SentinelSOC()