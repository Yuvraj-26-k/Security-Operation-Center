import re

IMAGE = re.compile(r"Image:\s(.+)")
COMMAND = re.compile(r"CommandLine:\s(.+)")
USER = re.compile(r"User:\s(.+)")

class SysmonExtractor:

    def extract(self, event):

        msg = event["message"]

        def find(regex):
            m = regex.search(msg)
            return m.group(1).strip() if m else ""

        return {
            "image": find(IMAGE),
            "command": find(COMMAND),
            "user": find(USER),
        }

extractor = SysmonExtractor()