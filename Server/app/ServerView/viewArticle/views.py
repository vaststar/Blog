from flask import jsonify,request,make_response
import os, random, string
from . import article_blue

from app.ServerView.Common import Common
from app.ServerView.Common.articleApi import ArticleApi
from app.ServerView.Common.fileApi import FileApi
from app.ServerView.Authority import Authority
from app.ServerConfig import config

@article_blue.route("/",methods=["GET"])
def get_AllArticles():
    pageNumber = request.args.get('pageNumber')
    pageSize = request.args.get('pageSize')
    if pageNumber is None or pageSize is None:
        return jsonify(Common.falseReturn(None,'please make pagenation'))
    #分页查询
    return jsonify(ArticleApi.getArticlePagnation(int(pageNumber),int(pageSize)))

@article_blue.route("/<articleid>",methods=["GET"])
def get_ArticleByID(articleid):
    return jsonify(ArticleApi.getArticleBaseByID(articleid))

@article_blue.route("/",methods=["POST"])
@Authority.login_required
def post_Article():
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    params = request.get_json()
    if 'title' in params and 'brief' in params and 'body' in params:
        #先将内容保存成文件，然后将地址等信息上传到数据库
        filePath = FileApi.generateFilePath(''.join([random.choice(string.digits + string.ascii_letters) for i in range(5)])+'.md',"articles/bodys/"+userid)
        absFilePath = os.path.join(config.STATIC_FILE_PATH,filePath)
        if FileApi.saveFile(absFilePath,params['body'])['status']:
            return jsonify(ArticleApi.postArticle(userid,params['title'],params['brief'],params["keywords"],params["coverurl"],filePath))
        else:
            return jsonify(Common.falseReturn(None,'file save failure!'))
    else:
        return jsonify(Common.falseReturn(None,'Please make sure {"title":a,"breif":a,"keywords":a,"body":a}'))

@article_blue.route("/<articleid>",methods=["PUT"])
@Authority.login_required
def update_Article(articleid):
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    #判定是否是自己的文章，否则不能修改
    articleBase = ArticleApi.getArticleBaseByID(articleid)
    if not articleBase['status']:
        return jsonify(Common.falseReturn(None,'article not found'))
    if userid != articleBase['data']['userid']:
        return jsonify(Common.falseReturn(None,"it's not your article"))
    #开始修改文章
    params = request.get_json()
    absFilePath = os.path.join(config.STATIC_FILE_PATH,articleBase['data']['bodyurl'])
    if FileApi.saveFile(absFilePath,params['body']):
        return jsonify(ArticleApi.updateArticle(articleid,params['title'],params['brief'],params["keywords"],params["coverurl"]))
    return jsonify(Common.falseReturn(None,'save article file wrong'))

@article_blue.route("/<articleid>",methods=["DELETE"])
@Authority.login_required
def delete_Article(articleid):
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    #判定是否是自己的文章，否则不能删除
    articleBase = ArticleApi.getArticleBaseByID(articleid)
    if not articleBase['status']:
        return jsonify(Common.falseReturn(None,'article not found'))
    if userid != articleBase['data']['userid']:
        return jsonify(Common.falseReturn(None,"it's not your article"))
    os.remove(os.path.join(config.STATIC_FILE_PATH,articleBase['data']['bodyurl']))
    return jsonify(ArticleApi.deleteArticle(articleid))

@article_blue.route("/counts/",methods=["GET"])
def get_allArticleCounts():
    return jsonify(ArticleApi.getAllArticleCount())

@article_blue.route("/counts/<userid>",methods=["GET"])
def get_UserArticleCounts(userid):
    return jsonify(ArticleApi.getArticleCountByUserId(userid))

@article_blue.route("/belongs/<articleid>",methods=["GET"])
@Authority.login_required
def get_IsSelfArticle(articleid):
    userid = Authority.get_user_id()
    if not userid:
        return jsonify(Common.falseReturn(None, 'login required'))
    return jsonify(ArticleApi.getIsSelfArticle(userid,articleid))







