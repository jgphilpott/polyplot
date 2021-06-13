from front.tree.home.api.route import register_api_route

from front.tree.home.api.airports.route import register_api_airports_route
from front.tree.home.api.airports.airport.route import register_api_airport_route

from front.tree.home.api.cities.route import register_api_cities_route
from front.tree.home.api.cities.city.route import register_api_city_route

from front.tree.home.api.countries.route import register_api_countries_route
from front.tree.home.api.countries.country.route import register_api_country_route

from front.tree.home.api.graticules.route import register_api_graticules_route
from front.tree.home.api.graticules.graticule.route import register_api_graticule_route

from front.tree.home.api.indicators.route import register_api_indicators_route
from front.tree.home.api.indicators.indicator.route import register_api_indicator_route

from front.tree.home.api.lakes.route import register_api_lakes_route
from front.tree.home.api.lakes.lake.route import register_api_lake_route

from front.tree.home.api.maps.route import register_api_maps_route
from front.tree.home.api.maps.map.route import register_api_map_route

from front.tree.home.api.ports.route import register_api_ports_route
from front.tree.home.api.ports.port.route import register_api_port_route

from front.tree.home.api.railroads.route import register_api_railroads_route
from front.tree.home.api.railroads.railroad.route import register_api_railroad_route

from front.tree.home.api.rivers.route import register_api_rivers_route
from front.tree.home.api.rivers.river.route import register_api_river_route

from front.tree.home.api.roads.route import register_api_roads_route
from front.tree.home.api.roads.road.route import register_api_road_route

def register_api_routes(app):

    register_api_route(app)

    register_api_airports_route(app)
    register_api_airport_route(app)

    register_api_cities_route(app)
    register_api_city_route(app)

    register_api_countries_route(app)
    register_api_country_route(app)

    register_api_graticules_route(app)
    register_api_graticule_route(app)

    register_api_indicators_route(app)
    register_api_indicator_route(app)

    register_api_lakes_route(app)
    register_api_lake_route(app)

    register_api_maps_route(app)
    register_api_map_route(app)

    register_api_ports_route(app)
    register_api_port_route(app)

    register_api_railroads_route(app)
    register_api_railroad_route(app)

    register_api_rivers_route(app)
    register_api_river_route(app)

    register_api_roads_route(app)
    register_api_road_route(app)
