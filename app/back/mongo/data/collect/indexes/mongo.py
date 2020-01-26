from pprint import pprint as pp
from back.mongo.data.collect.ions import find_collection
from back.mongo.data.collect.indexes.object import Index

indexes = find_collection("indexes")

def find_index(index, log=False):

    code = index

    if log:

        index = indexes.find_one({"code": code}, {"_id": 0, "geographies": 0})

        if index:

            print("\n\033[93mIndex:\033[0m {}\n".format(code))
            pp(index)
            print("")

        else:

            print("\n\033[93mIndex\033[0m {} \033[93mnot found.\033[0m\n".format(code))

    else:

        index = indexes.find_one({"code": code}, {"_id": 0})

        return index

def find_indexes(log=False):

    if log:

        print("\n\033[93mThere are a total of {} indexes.\033[0m\n".format(indexes.count()))

        if indexes.count():

            count = 1

            for index in indexes.find({}, {"_id": 0}):

                print("\033[93mIndex #{}:\033[0m {} \033[93m~\033[0m {}".format(count, index["code"], index["index"]))
                count += 1

            print("")

    else:

        return indexes.find({}, {"_id": 0})

def update_index(index, log=False):

    code = index
    index = find_index(code)
    index = Index(index)

    if log:

        index.update(log)

    else:

        index.update()

    indexes.update_one({"code": index.code}, {"$set": index.__dict__})

def update_indexes(log=False):

    for index in find_indexes():

        if log:

            update_index(index["code"], log=log)

        else:

            update_index(index["code"])
