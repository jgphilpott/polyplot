from front.tree.home.route import register_home_route

from front.tree.home.map.route import register_map_route
from front.tree.home.two.route import register_two_route
from front.tree.home.three.route import register_three_route

def register(app):

    register_home_route(app)

    register_map_route(app)
    register_two_route(app)
    register_three_route(app)

    return app
