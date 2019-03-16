from flask import jsonify,request
from . import browser_blue

from app.ServerView.Common import Common
from app.ServerView.Authority import Authority
from app.ServerView.Common.browserApi import BrowserApi

@browser_blue.route("/articles/<articleid>",methods=["GET"])
def get_ArticleBrowserNumber(articleid):
    return jsonify(BrowserApi.getArticleBrowser(articleid))

@browser_blue.route("/articles/",methods=["POST"])
def add_ArticleBrowser():
    articleid=None
    params = request.get_json()
    if 'articleid' in params:
        articleid=params['articleid']
    else:
        return jsonify(Common.falseReturn(None,'articleid is required'))
    userid = Authority.get_user_id()
    return jsonify(BrowserApi.postArticleBrowser(articleid,userid,request.remote_addr))