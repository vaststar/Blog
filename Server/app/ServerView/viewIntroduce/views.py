from flask import jsonify,request
from . import introduce_blue

from app.ServerView.Common import Common
from app.ServerView.Authority import Authority
from app.ServerView.Common.introduceApi import IntroduceApi


@introduce_blue.route("/<userid>",methods=['GET'])
def get_UserIntroduce(userid):
    return jsonify(IntroduceApi.getIntroduceByUserid(userid))

@introduce_blue.route("/",methods=['POST'])
@Authority.login_required
def post_UserIntroduce():
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    params = request.get_json()
    if 'resume' in params and 'tags' in params :
        return jsonify(IntroduceApi.postIntroduce(userid,params['resume'],params['tags']))
    return jsonify(Common.falseReturn(None,'add error'))

@introduce_blue.route("/",methods=['PUT'])
@Authority.login_required
def update_UserIntroduce():
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    params = request.get_json()
    if 'resume' in params and 'tags' in params :
        return jsonify(IntroduceApi.changeIntroduce(userid,params['resume'],params['tags']))
    return jsonify(Common.falseReturn(None,'add error'))

@introduce_blue.route("/resumes/",methods=['PUT'])
@Authority.login_required
def update_UserIntroduceResume():
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    params = request.get_json()
    if 'resume' in params :
        return jsonify(IntroduceApi.changeResume(userid,params['resume']))
    return jsonify(Common.falseReturn(None,'resume is needed'))

@introduce_blue.route("/tags/",methods=['PUT'])
@Authority.login_required
def update_UserIntroduceTag():
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'login required'))
    params = request.get_json()
    if 'tags' in params :
        return jsonify(IntroduceApi.changeTags(userid,params['tags']))
    return jsonify(Common.falseReturn(None,'tags is needed'))

