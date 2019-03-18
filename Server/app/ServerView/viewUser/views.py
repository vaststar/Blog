from flask import jsonify,request
from . import user_blue

from app.ServerView.Common import Common
from app.ServerView.Authority import Authority
from app.ServerView.Common.userApi import UserApi

@user_blue.route("/tokens/",methods=['POST'])
def get_token():
    '''获取一个口令，用于保持登陆'''
    params = request.get_json()
    a = Authority.Authority.authenticate(params.get('username'), Authority.Authority.hash_secret(params.get('password')))
    return a

@user_blue.route("/selfid/",methods=["GET"])
@Authority.login_required
def get_selfId():
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    return jsonify(Common.trueReturn(userid,'query ok'))

@user_blue.route("/bases/",methods=["GET"])
@Authority.login_required
def get_AllUserBase():
    return jsonify(UserApi.getAllUserBase())

@user_blue.route("/bases/<username>/",methods=["GET"])
@Authority.login_required
def get_SelfUserBase(username):
    return jsonify(UserApi.getUserBaseByName(username))

@user_blue.route("/",methods=["POST"])
def register_Auths():
    '''注册一个账户，需要提供 post json 信息 
    {"username":"???","password":"???","realname":???,"idcard":???,"cellphone":???,"email":???,"avatarurl":???}'''
    params = request.get_json()
    if not params.get('username') or not params.get('password'):
        return jsonify(Common.falseReturn(None,'username or password cannot be empty'))
    base = UserApi.registerUserBase(params.get('username'),params.get('password'))
    if base.get('status'):
        info = UserApi.registerUserInfo(base.get('data').get('userid'),params.get('realname'),params.get('idcard'),params.get('cellphone'),params.get('email'),params.get('avatarurl'))
        return jsonify(info)
    return jsonify(base)

@user_blue.route("/usernames/<userid>",methods=["GET"])
def get_username(userid):
    return jsonify(UserApi.getUserNameById(userid))

@user_blue.route("/useravatars/<userid>",methods=["GET"])
def get_userAvatar(userid):
    return jsonify(UserApi.getUserAvatarById(userid))

@user_blue.route("/userinfos/<userid>",methods=["GET"])
@Authority.login_required
def get_userinfo(userid):
    return jsonify(UserApi.getUserInfoByUserid(userid))



