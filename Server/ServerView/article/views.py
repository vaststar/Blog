from flask import jsonify,request,send_from_directory
import os
from . import article_blue

from Server.ServerView.Common import Common
from Server.ServerView.article.articleApi import ArticleApi
from Server.ServerView.Authority import Authority
from Server.ServerConfig import config


@article_blue.route("/bases/",methods=["GET"])
def get_AllArticles():
    return jsonify(ArticleApi.getAllArticle())

@article_blue.route("/",methods=["POST"])
@Authority.login_required
def post_Article():
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    params = request.get_json()
    if 'title' in params and 'brief' in params and 'body' in params:
        #先将内容保存成文件，然后将地址等信息上传到数据库
        filePath = Common.generateFilePath(params['title'])
        absFilePath = os.path.join(config.STATIC_FILE_PATH,filePath)
        if Common.saveFile(absFilePath,params['body']):
            return jsonify(ArticleApi.postArticle(userid,params['title'],params['brief'],filePath))
        else:
            return jsonify(Common.falseReturn(None,'file save failure!'))
    else:
        return jsonify(Common.falseReturn(None,'Please make sure {"title":a,"breif":a,"body":a}'))

@article_blue.route("/bases/<path:articleid>",methods=["GET"])
def get_ArticleByID(articleid):
    return jsonify(ArticleApi.getArticleBaseByID(articleid))
