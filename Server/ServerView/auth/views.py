from flask import jsonify,request
from . import auth_blue
from Server.ServerDB import blogDB

@auth_blue.route("/",methods=["GET"])
def get_AllAuths():
    '''获取user_base表所有内容'''
    result = []
    for k,v in enumerate(blogDB.getAllUser()):
        result.append(dict(zip(("id","name","password"),v)))
    return jsonify(result)

@auth_blue.route("/",methods=["POST"])
def register_Auths():
    '''注册一个账户，需要提供 post json 信息 {“username”:"???","password":"???"}'''
    params = request.get_json()
    bl = blogDB.addUser(params.get('username'),params.get('password'))
    le = blogDB
    return jsonify(bl)
