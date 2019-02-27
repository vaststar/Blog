from flask import jsonify,request,send_from_directory
import os
from . import user_blue

from Server.ServerView.Common import Common
from Server.ServerView.Authority import Authority
from Server.ServerView.user.userApi import UserApi
from Server.ServerConfig import config

@user_blue.route("/tokens/",methods=['POST'])
def get_token():
    '''获取一个口令，用于保持登陆'''
    params = request.get_json()
    a = Authority.Authority.authenticate(params.get('username'), Authority.Authority.hash_secret(params.get('password')))
    return a

@user_blue.route("/bases/",methods=["GET"])
@Authority.login_required
def get_AllUserBase():
    return jsonify(UserApi.getAllUserBase())

@user_blue.route("/bases/<path:username>/",methods=["GET"])
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

