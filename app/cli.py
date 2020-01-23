from fire import Fire

from back.mongo.database import get_client
from back.mongo.database import get_database
from back.mongo.database import drop_database

from back.mongo.collections import get_collection
from back.mongo.collections import get_collections
from back.mongo.collections import collect_indicator
from back.mongo.collections import collect_indicators
from back.mongo.collections import drop_collection

from back.mongo.indicators import get_indicator
from back.mongo.indicators import get_indicators

Fire()
