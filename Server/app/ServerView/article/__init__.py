from flask import Blueprint

article_blue = Blueprint("article",__name__)

import app.ServerView.article.views