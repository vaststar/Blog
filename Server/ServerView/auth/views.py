from flask import jsonify
from . import auth_blue
from Server.ServerDB import blogDB

@auth_blue.route("/",methods=["GET"])
def get_AllAuths():
    return jsonify({"method":"get","error":"404"})