from app.ServerApp.FlaskServerApp import FlaskServerApp
from app.ServerView import BLUEPRINT

ServerApp = FlaskServerApp()

# 注册蓝图
for k, v in BLUEPRINT.items():
    ServerApp.registerBluePrint(v, k)