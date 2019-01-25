from flask import jsonify,request
from . import author_blue

from Server.ServerDB import blogDB
from Server.ServerView.Common import Common
from Server.ServerView.Authority import Authority as Authority

@author_blue.route("/token/",methods=['POST'])
def get_token():
    '''获取一个口令，用于保持登陆'''
    params = request.get_json()
    return Authority.Authority.authenticate(params.get('username'), Authority.Authority.hash_secret(params.get('password')))

@author_blue.route("/",methods=["GET"])
@Authority.login_required
def get_AllAuths():
    '''获取user_base表所有内容'''
    result = []
    for k,v in enumerate(blogDB.getAllUser()):
        result.append(dict(zip(("id","name","password"),v)))
    return jsonify(result)

@author_blue.route("/",methods=["POST"])
def register_Auths():
    '''注册一个账户，需要提供 post json 信息 {"username":"???","password":"???"}'''
    params = request.get_json()
    if not params.get('username') or not params.get('password'):
        return jsonify(Common.falseReturn(None,'username or password cannot be empty'))
    bl = blogDB.addUser(params.get('username'),Authority.Authority.hash_secret(params.get('password')))
    if not bl is None:
        return jsonify(Common.trueReturn({'userid':bl},'register ok'))
    else:
        return jsonify(Common.falseReturn(None,'register failure'))
