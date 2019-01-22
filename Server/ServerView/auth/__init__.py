from flask import Blueprint

auth_blue = Blueprint("auth",__name__)

import Server.ServerView.auth.views