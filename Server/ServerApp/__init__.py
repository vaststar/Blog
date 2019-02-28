from Server.ServerApp.FlaskServerApp import FlaskServerApp
from Server.ServerView import BLUEPRINT

ServerApp = FlaskServerApp()

# 注册蓝图
for k, v in BLUEPRINT.items():
    ServerApp.registerBluePrint(v, k)