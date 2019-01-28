from flask import Flask
from flask_cors import CORS

class FlaskServerApp(object):
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)#跨域

    def registerBluePrint(self,blueprint,url_pre):
        self.app.register_blueprint(blueprint,url_prefix=url_pre)

    def RunApp(self,host=None, port=None, debug=None):
        self.app.run(host, port, debug)