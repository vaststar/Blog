import sys
sys.path.append('.')
sys.path.append('..')

from app.ServerApp import ServerApp

app = ServerApp.app

if __name__ == "__main__":

    #运行app
    # app.RunApp('0.0.0.0',4444,debug=True)
    #运行manager
    ServerApp.RunManager()

