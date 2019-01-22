from flask import Flask

class FlaskServerApp(object):
    def __init__(self):
        self.app = Flask(__name__)

    def registerBluePrint(self,blueprint,url_pre):
        self.app.register_blueprint(blueprint,url_prefix=url_pre)

    def RunApp(self):
        self.app.run()