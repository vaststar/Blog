from flask import jsonify,request
from . import auth_blue
from Server.ServerDB import blogDB

@auth_blue.route("/",methods=["GET"])
def get_AllAuths():
    result = []
    for k,v in enumerate(blogDB.getAllUser()):
        result.append(dict(zip(("id","name","password"),v)))
    return jsonify(result)

@auth_blue.route("/",methods=["POST"])
def register_Auths():
    params = request.get_json()
    bl = blogDB.addUser(params.get('userid'),params.get('password'))
    le = blogDB
    return jsonify(bl)
