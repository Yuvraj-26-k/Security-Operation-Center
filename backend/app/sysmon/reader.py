import win32evtlog

LOG_NAME = "Microsoft-Windows-Sysmon/Operational"


class SysmonReader:

    def __init__(self):
        self.seen = set()

    def read(self):

        handle = win32evtlog.EvtQuery(
            LOG_NAME,
            win32evtlog.EvtQueryReverseDirection,
            "*[System[(EventID=1)]]",
        )

        events = []

        while True:

            try:
                batch = win32evtlog.EvtNext(
                    handle,
                    10,
                )
            except Exception:
                break

            if not batch:
                break

            for event in batch:

                xml = win32evtlog.EvtRender(
                    event,
                    win32evtlog.EvtRenderEventXml,
                )

                if xml in self.seen:
                    continue

                self.seen.add(xml)

                events.append(xml)

            break

        return events


reader = SysmonReader()