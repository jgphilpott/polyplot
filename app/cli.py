from fire import Fire

from back.mongo.client import find_client

from back.mongo.data.base import find_database, drop_database

from back.mongo.data.collect.ions import find_collection, find_collections, drop_collection

from back.mongo.data.collect.indexes.mongo import find_index, find_indexes, update_index, update_indexes

open("app/back/tools/flint/dev.py", "a")
from back.tools.flint.dev import *

Fire()
