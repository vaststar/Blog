from flask import jsonify,request
from . import likes_blue

from app.ServerView.Common import Common
from app.ServerView.Authority import Authority
from app.ServerView.Common.likesApi import LikesApi

@likes_blue.route("/articles/<articleid>",methods=["GET"])
def get_articleLikes(articleid):
    return jsonify(LikesApi.getLikesArticleNumber(articleid))

@likes_blue.route("/comments/<commentid>",methods=["GET"])
def get_commentLikes(commentid):
    return jsonify(LikesApi.getLikesCommentNumber(commentid))

@likes_blue.route("/articles/",methods=["POST"])
@Authority.login_required
def add_articleLikes():
    userid = Authority.get_user_id()
    if not userid:
        return jsonify(Common.falseReturn(None, 'login required'))
    params = request.get_json()
    if 'articleid' in params:
        return jsonify(LikesApi.postLikesArticle(params['articleid'],userid))
    return jsonify(Common.falseReturn(None,'articleid in json is needed'))

@likes_blue.route("/comments/",methods=["POST"])
@Authority.login_required
def add_commentLikes():
    userid = Authority.get_user_id()
    if not userid:
        return jsonify(Common.falseReturn(None, 'login required'))
    params = request.get_json()
    if 'commentid' in params:
        return jsonify(LikesApi.postLikesComment(params['commentid'],userid))
    return jsonify(Common.falseReturn(None,'commentid in json is needed'))

@likes_blue.route("/articles/<articleid>",methods=["DELETE"])
@Authority.login_required
def del_articleLikes(articleid):
    userid = Authority.get_user_id()
    if not userid:
        return jsonify(Common.falseReturn(None, 'login required'))
    return jsonify(LikesApi.delLikesArticle(articleid,userid))

@likes_blue.route("/comments/<commentid>",methods=["DELETE"])
@Authority.login_required
def del_commentLikes(commentid):
    userid = Authority.get_user_id()
    if not userid:
        return jsonify(Common.falseReturn(None, 'login required'))
    return jsonify(LikesApi.delLikesComment(commentid,userid))


@likes_blue.route("/belongs/articles/<articleid>",methods=["GET"])
@Authority.login_required
def get_IsSelfLikeArticle(articleid):
    userid = Authority.get_user_id()
    if not userid:
        return jsonify(Common.falseReturn(None, 'login required'))
    return jsonify(LikesApi.getIsSelfLikesArticle(userid,articleid))

@likes_blue.route("/belongs/comments/<commentid>",methods=["GET"])
@Authority.login_required
def get_IsSelfLikeComment(commentid):
    userid = Authority.get_user_id()
    if not userid:
        return jsonify(Common.falseReturn(None, 'login required'))
    return jsonify(LikesApi.getIsSelfLikesComment(userid,commentid))
