import time

from app.sysmon.database_writer import writer


def run():

    while True:

        try:

            writer.sync()

        except Exception as error:

            print(error)

        time.sleep(5)