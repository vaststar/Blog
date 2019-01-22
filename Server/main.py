from Server.ServerApp import app
from Server.ServerView import BLUEPRINT

if __name__ == "__main__":
    #注册蓝图
    for k,v in BLUEPRINT.items():
        app.registerBluePrint(v,k)
    #运行app
    app.RunApp(debug=True)

