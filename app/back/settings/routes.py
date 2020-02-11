from front.tree.home.route import register_home_route

from front.tree.home.countries.route import register_countries_route
from front.tree.home.countries.country.route import register_country_route

from front.tree.home.indexes.route import register_indexes_route
from front.tree.home.indexes.index.route import register_index_route

from front.tree.home.map.route import register_map_route

from front.tree.home.two.route import register_two_route
from front.tree.home.three.route import register_three_route

from front.tree.errors._404_.route import register_404_error_route
from front.tree.errors._500_.route import register_500_error_route

def register(app):

    register_home_route(app)

    register_countries_route(app)
    register_country_route(app)

    register_indexes_route(app)
    register_index_route(app)

    register_map_route(app)

    register_two_route(app)
    register_three_route(app)

    register_404_error_route(app)
    register_500_error_route(app)

    return app
