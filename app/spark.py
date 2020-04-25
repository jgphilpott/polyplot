from fire import Fire

from back.mongo.client import find_client

from back.mongo.data.base import find_database, drop_database

from back.mongo.data.collect.ions import find_collection, find_collections, drop_collection

from back.mongo.data.collect.countries.mongo import find_country, find_countries, find_country_size, find_countries_size
from back.mongo.data.collect.indicators.mongo import find_indicator, find_indicators, update_indicator, update_indicators, find_indicator_size, find_indicators_size
from back.mongo.data.collect.maps.mongo import find_map, find_maps, find_map_size, find_maps_size

from back.settings.compile import compile_sass

Fire()
