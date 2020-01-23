from fire import Fire

from mongo.database import get_client
from mongo.database import get_database
from mongo.database import drop_database

from mongo.collections import get_collection
from mongo.collections import get_collections
from mongo.collections import collect_indicator
from mongo.collections import collect_indicators
from mongo.collections import drop_collection

from mongo.indicators import get_indicator
from mongo.indicators import get_indicators

Fire()
