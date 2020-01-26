from back.mongo.data.collect.ions import find_collection

indexes = find_collection("indexes")

def find_index(index, log=False):

    code = index
    index = indexes.find_one({"code": code})

    if log:

        if index:

            print("\n\033[93mIndex:\033[0m {}\n\n{}\n".format(code, index))

        else:

            print("\n\033[93mIndex\033[0m {} \033[93mnot found.\033[0m\n".format(code))

    else:

        return index

def find_indexes(log=False):

    if log:

        print("\n\033[93mThere are a total of {} indexes.\033[0m\n".format(indexes.count()))

        if indexes.count():

            count = 1

            for index in indexes.find():

                print("\033[93mIndex #{}:\033[0m {} \033[93m=\033[0m {}".format(count, index["code"], index["index"]))
                count += 1

            print()

    else:

        return indexes.find()

def update_index(index, log=False):

    pass

def update_indexes(log=False):

    pass
