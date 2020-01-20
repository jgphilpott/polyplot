from data.collections.indicators import get_indicators, collect_indicator

def init_db(db):

    collections = db.list_collection_names()
    indicators = get_indicators()

    for indicator in indicators:
        if indicator["code"] not in collections:
            collection = db[indicator["code"]]
            collect_indicator(collection, indicator)
