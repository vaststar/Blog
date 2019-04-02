from flask import jsonify,request
from . import comment_blue

from app.ServerView.Common import Common
from app.ServerView.Common.Identify import IdentifyUtil
from app.ServerView.Common.commentApi import CommentApi

@comment_blue.before_request
@IdentifyUtil.robot_defend
def before_req():
    return None

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
    left=min(len(l),max(0,(int(pageNumber)-1)*int(pageSize)))
    right=min(len(l),max(0,int(pageNumber)*int(pageSize)))
    return jsonify(Common.trueReturn(l[left:right],'query ok'))

@comment_blue.route("/",methods=["POST"])
@IdentifyUtil.login_required
def post_Comments():
    '''需要提供articleid，comment，refid'''
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    params = request.get_json()
    if 'articleid' not in params or 'comment' not in params:
        return jsonify(Common.falseReturn('articleid and comment is required'))
    res = CommentApi.postComment(params.get('articleid'),userid,params.get('comment'),params.get('refid'))
    return jsonify(res)

@comment_blue.route("/<commentid>",methods=["DELETE"])
@IdentifyUtil.login_required
def delete_Comments(commentid):
    #获取自己id，只能删除自己文章下或者自己的评论
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    if CommentApi.getIsSelfComment(userid,commentid)['data'] or CommentApi.getIsSelfArticlesComment(userid,commentid)['data']:
        return jsonify(CommentApi.deleteComment(commentid))
    return jsonify(Common.falseReturn(None,'permission denied'))

@comment_blue.route("/<commentid>",methods=["PUT"])
@IdentifyUtil.login_required
def update_Comments(commentid):
    #获取自己id，只能修改自己的评论
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    params = request.get_json()
    if 'comment' not in params:
        return jsonify(Common.falseReturn(None,'comment is required'))
    if not CommentApi.getIsSelfComment(userid,commentid)['data']:
        return jsonify(Common.falseReturn(None,'permission denied'))
    return jsonify(CommentApi.updateCommentByCommentId(commentid,params.get('comment')))

@comment_blue.route("/counts/topcomments/<articleid>",methods=["GET"])
def get_articleCommentCounts(articleid):
    return jsonify(CommentApi.getCommentCountByArticleId(articleid))

@comment_blue.route("/counts/childcomments/<commentid>",methods=["GET"])
def get_childCommentCounts(commentid):
    return jsonify(CommentApi.getChildCommentCountByCommentId(commentid))


@comment_blue.route("/belongs/<commentid>",methods=["GET"])
@IdentifyUtil.login_required
def get_IsSelfComment(commentid):
    userid = IdentifyUtil.get_user_id()
    if not userid:
        return jsonify(Common.falseReturn(None, 'login required'))
    return jsonify(CommentApi.getIsSelfComment(userid,commentid))