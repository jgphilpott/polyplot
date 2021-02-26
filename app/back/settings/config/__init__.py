from os import urandom

def config(app):

    app.config["SECRET_KEY"] = urandom(42).hex()
    app.jinja_env.auto_reload = True

    return app
