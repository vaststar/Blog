from flask import jsonify,request
from . import comment_blue

from app.ServerView.Common import Common
from app.ServerView.Common.Identify import IdentifyUtil
from app.ServerView.Common.commentApi import CommentApi

@comment_blue.route("/<articleid>",methods=["GET"])
def get_Comments(articleid):
    pageNumber = request.args.get('pageNumber')
    pageSize = request.args.get('pageSize')
    if pageNumber is None or pageSize is None:
        return jsonify(Common.falseReturn(None,'please make pagenation'))

    comments = CommentApi.getCommentByArticleId(articleid)
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
    #取前N个
    return jsonify(Common.trueReturn(l[(int(pageNumber)-1)*int(pageSize):int(pageNumber)*int(pageSize)],'query ok'))

@comment_blue.route("/",methods=["POST"])
@IdentifyUtil.login_required
def post_Comments():
    '''需要提供articleid，comment，refid'''
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    params = request.get_json()
    res = CommentApi.postComment(params.get('articleid'),userid,params.get('comment'),params.get('refid'))
    return jsonify(res)

@comment_blue.route("/<commentid>",methods=["DELETE"])
@IdentifyUtil.login_required
def delete_Comments(commentid):
    return jsonify(CommentApi.deleteComment(commentid))

@comment_blue.route("/counts/topcomments/<articleid>",methods=["GET"])
def get_articleCommentCounts(articleid):
    return jsonify(CommentApi.getCommentCountByArticleId(articleid))

@comment_blue.route("/counts/childcomments/<commentid>",methods=["GET"])
def get_childCommentCounts(commentid):
    return jsonify(CommentApi.getChildCommentCountByCommentId(commentid))