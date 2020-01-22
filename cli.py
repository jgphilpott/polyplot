from fire import Fire

from app.mongo.database import get_client
from app.mongo.database import get_database
from app.mongo.database import drop_database

from app.mongo.collections import get_collection
from app.mongo.collections import get_collections
from app.mongo.collections import collect_indicator
from app.mongo.collections import collect_indicators
from app.mongo.collections import drop_collection

from app.mongo.indicators import get_indicator
from app.mongo.indicators import get_indicators

Fire()
