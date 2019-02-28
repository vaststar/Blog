import sys
sys.path.append('.')
sys.path.append('..')

from Server.ServerApp import ServerApp
from Server.ServerView import BLUEPRINT

# 注册蓝图
for k, v in BLUEPRINT.items():
    ServerApp.registerBluePrint(v, k)

app = ServerApp.app

if __name__ == "__main__":

    #运行app
    # app.RunApp('0.0.0.0',4444,debug=True)
    #运行manager
        ServerApp.RunManager()

