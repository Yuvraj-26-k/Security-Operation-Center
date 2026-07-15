import xml.etree.ElementTree as ET
from datetime import datetime


class ParsedEvent:

    def __init__(self):

        self.event_id = None

        self.time = None

        self.message = ""

        self.image = ""

        self.command_line = ""

        self.parent_image = ""

        self.user = ""

        self.hashes = ""

        self.current_directory = ""


class SysmonParser:

    def parse(self, xml_event: str):

        parsed = ParsedEvent()

        try:

            root = ET.fromstring(xml_event)

            ns = {
                "e": "http://schemas.microsoft.com/win/2004/08/events/event"
            }

            system = root.find("e:System", ns)

            if system is not None:

                event_id = system.find("e:EventID", ns)

                if event_id is not None:
                    parsed.event_id = int(event_id.text)

                time = system.find("e:TimeCreated", ns)

                if time is not None:
                    parsed.time = time.attrib.get("SystemTime")

            event_data = root.find("e:EventData", ns)

            message = []

            if event_data is not None:

                for data in event_data.findall("e:Data", ns):

                    name = data.attrib.get("Name", "")
                    value = data.text or ""

                    message.append(f"{name}: {value}")

                    if name == "Image":
                        parsed.image = value

                    elif name == "CommandLine":
                        parsed.command_line = value

                    elif name == "ParentImage":
                        parsed.parent_image = value

                    elif name == "User":
                        parsed.user = value

                    elif name == "Hashes":
                        parsed.hashes = value

                    elif name == "CurrentDirectory":
                        parsed.current_directory = value

            parsed.message = "\n".join(message)

        except Exception as error:

            print(f"[Parser] {error}")

        return parsed


parser = SysmonParser()