from front.tree.home.api.route import register_api_route

from front.tree.home.api.airports.route import register_api_airports_route
from front.tree.home.api.cities.route import register_api_cities_route
from front.tree.home.api.countries.route import register_api_countries_route
from front.tree.home.api.graticules.route import register_api_graticules_route
from front.tree.home.api.indicators.route import register_api_indicators_route
from front.tree.home.api.lakes.route import register_api_lakes_route
from front.tree.home.api.maps.route import register_api_maps_route
from front.tree.home.api.ports.route import register_api_ports_route
from front.tree.home.api.railroads.route import register_api_railroads_route
from front.tree.home.api.rivers.route import register_api_rivers_route
from front.tree.home.api.roads.route import register_api_roads_route

def register_api_routes(app):

    register_api_route(app)

    register_api_airports_route(app)
    register_api_cities_route(app)
    register_api_countries_route(app)
    register_api_graticules_route(app)
    register_api_indicators_route(app)
    register_api_lakes_route(app)
    register_api_maps_route(app)
    register_api_ports_route(app)
    register_api_railroads_route(app)
    register_api_rivers_route(app)
    register_api_roads_route(app)
