from fire import Fire

from app.mongo.database import get_client
from app.mongo.database import get_database
from app.mongo.database import drop_database

from app.mongo.collection import get_collection
from app.mongo.collection import get_collections
from app.mongo.collection import collect_indicator
from app.mongo.collection import collect_indicators

from app.mongo.indicator import get_indicator
from app.mongo.indicator import get_indicators

Fire()
