from back.mongo.data.base import find_database
from back.tools.alarm.warning import warning_loop

database = find_database()
collections = database.list_collection_names()

def find_collection(collection, log=False):

    code = collection
    collection = database[code]

    if log:

        if collection.count():

            print("\n\033[93mCollection:\033[0m {}\n\n{}\n".format(code, collection))

        else:

            print("\n\033[93mCollection\033[0m {} \033[93mnot found.\033[0m\n".format(code))

    else:

        return collection

def find_collections(log=False):

    if log:

        print("\n\033[93mThere are a total of {} collections.\033[0m\n".format(len(collections)))

        if collections:

            count = 1

            for collection in collections:

                print("\033[93mCollection #{}:\033[0m {}".format(count, collection))
                count += 1

            print()

    else:

        return collections

def drop_collection(collection, log=False):

    code = collection
    collection = find_collection(code)

    if log:

        warning = "\n\033[91mWarning! Are you sure you want to drop the collection:\033[0m {}\n".format(code)
        message = "\n\033[93mOkay, the collection\033[0m {} \033[93mhas been droped!\033[0m\n".format(code)

        reply = warning_loop(warning, message)

        if reply:

            collection.drop()

    else:

        return collection.drop()
