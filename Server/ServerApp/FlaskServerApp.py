from flask import Flask
from flask_cors import CORS
from flask_script import Manager,Server

class FlaskServerApp(object):
    def __init__(self):
        self.app = Flask(__name__)
        self.manager = Manager(self.app)
        CORS(self.app)#跨域

    def registerBluePrint(self,blueprint,url_pre):
        self.app.register_blueprint(blueprint,url_prefix=url_pre)

    def RunApp(self,host=None, port=None, debug=None):
        self.app.run(host, port, debug)
    
    def RunManager(self):
        #eg:-h 0.0.0.0 -p 4444 -d(-h地址 -p端口 -d开启调试模式)
        self.manager.run()