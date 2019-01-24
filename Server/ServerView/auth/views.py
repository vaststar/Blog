from flask import jsonify
from . import auth_blue
from Server.ServerDB import blogDB

@auth_blue.route("/",methods=["GET"])
def get_AllAuths():
    result = []
    for k,v in enumerate(blogDB.getAllUser()):
        result.append(dict(zip(("id","name","password"),v)))

    return jsonify(result)