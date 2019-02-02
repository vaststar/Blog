from flask import jsonify,request
from . import author_blue

from Server.ServerDB import blogDB
from Server.ServerView.Common import Common
from Server.ServerView.Authority import Authority as Authority

@author_blue.route("/token/",methods=['POST'])
def get_token():
    '''获取一个口令，用于保持登陆'''
    params = request.get_json()
    a = Authority.Authority.authenticate(params.get('username'), Authority.Authority.hash_secret(params.get('password')))
    print(a)
    return a

@author_blue.route("/",methods=["GET"])
@Authority.login_required
def get_AllAuths():
    param = request.args.get('username')
    if param is None:
        '''获取user_base表所有内容'''
        result = []
        for k,v in enumerate(blogDB.getAllUser()):
            result.append(dict(zip(("id","name","password"),v)))
        if result:
            return jsonify(Common.trueReturn(result,'query ok'))
        else:
            return jsonify(Common.falseReturn(None,'no member'))
    else :
        user = blogDB.getUserByName(param)
        if user :
            return jsonify(Common.trueReturn(dict(zip(("id","name","password"),user)),'query ok'))
        else:
            return jsonify(Common.falseReturn(None,'bad query'))

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

# @author_blue.route('/',methods=['GET'])
# @Authority.login_required
# def get_AuthorInfo():
#     '''获取自己的信息'''
#     param = request.args.get('username')

