from back.sked.tasks import start_tasks
from back.socket.plug import plugin

def launch(app):

    start_tasks()
    plugin(app).run(app, host="0.0.0.0", port=5000, debug=True)
