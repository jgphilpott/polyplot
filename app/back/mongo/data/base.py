from back.mongo.client import find_client
from back.tools.alarm.warning import warning_loop

client = find_client()
database = client.iGraph

def find_database(log=False):

    if log:

        print("\n\033[93mThe mongo database:\033[0m\n\n{}\n".format(database))

    else:

        return database

def drop_database(log=False):

    if log:

        warning = "\n\033[91mWarning! Are you sure you want to drop the database?\033[0m\n"
        message = "\n\033[93mOkay, the database has been droped!\033[0m\n"

        reply = warning_loop(warning, message)

        if reply:

            client.drop_database(database)

    else:

        return client.drop_database(database)
