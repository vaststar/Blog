from flask import Blueprint

file_blue = Blueprint("files",__name__)

import app.ServerView.Common.FileService