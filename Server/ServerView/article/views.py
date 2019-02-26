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

@article_blue.route("/bases/<articleid>",methods=["GET"])
def get_ArticleByID(articleid):
    return jsonify(ArticleApi.getArticleBaseByID(articleid))

@article_blue.route("/bases/",methods=["POST"])
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
            return jsonify(ArticleApi.postArticle(userid,params['title'],params['brief'],params["keywords"],params["coverurl"],filePath))
        else:
            return jsonify(Common.falseReturn(None,'file save failure!'))
    else:
        return jsonify(Common.falseReturn(None,'Please make sure {"title":a,"breif":a,"keywords":a,"body":a}'))

@article_blue.route("/comments/<articleid>",methods=["GET"])
def get_Comments(articleid):
    comments = ArticleApi.getCommentByArticleId(articleid)
    if not comments['status']:
        return jsonify(comments)
    #将线性的评论转换为树状结构
    entities={}
    [entities.update({content['commentid']:content}) for content in comments['data']]
    l=[]
    for e_id in entities:
        entitiy = entities[e_id]
        fid = entitiy['refid']
        if fid == '':
            l.append(entitiy)
        else:
            entities[fid].setdefault('soncomment', []).append(entitiy)
    return jsonify(Common.trueReturn(l,'query ok'))


@article_blue.route("/comments/",methods=["POST"])
@Authority.login_required
def post_Comments():
    '''需要提供articleid，comment，refid'''
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    params = request.get_json()
    res = ArticleApi.postComment(params.get('articleid'),userid,params.get('comment'),params.get('refid'))
    return jsonify(res)

@article_blue.route("/counts/topcomments/<articleid>",methods=["GET"])
def get_articleCommentCounts(articleid):
    return jsonify(ArticleApi.getCommentCountByArticleId(articleid))






