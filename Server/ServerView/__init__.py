from Server.ServerView.auth import auth_blue
from Server.ServerView.manager import manager_blue

BLUEPRINT = {"/auth":auth_blue,"/manager":manager_blue}