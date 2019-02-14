from flask import jsonify,request,send_from_directory
import os
from . import article_blue

from Server.ServerView.Common import Common
from Server.ServerView.article.articleApi import ArticleApi
from Server.ServerConfig import config


@article_blue.route("/bases/",methods=["GET"])
def get_AllArticles():
    return jsonify(ArticleApi.getAllArticle())