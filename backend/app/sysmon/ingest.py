from app.sysmon.reader import reader
from app.sysmon.parser import parser
from app.sysmon.mapper import mitre


class SysmonIngest:

    def collect(self):

        events = reader.read()

        parsed_events = []

        for event in events:

            data = parser.parse(event)

            tactic, technique = mitre(
                data.event_id
            )

            parsed_events.append(

                {

                    "event_id": data.event_id,

                    "time": data.time,

                    "message": data.message,

                    "image": data.image,

                    "command_line": data.command_line,

                    "parent_image": data.parent_image,

                    "user": data.user,

                    "hashes": data.hashes,

                    "current_directory": data.current_directory,

                    "tactic": tactic,

                    "technique": technique,

                }

            )
            

        return parsed_events


ingestor = SysmonIngest()