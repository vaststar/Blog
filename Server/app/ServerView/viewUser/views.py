from flask import jsonify,request
from . import user_blue

from app.ServerView.Common import Common
from app.ServerView.Common.Identify import IdentifyUtil
from app.ServerView.Common.userApi import UserApi
from app.ServerView.Common.validCode import ValidEmail

@user_blue.before_request
@IdentifyUtil.robot_defend
def before_req():
    return None

@user_blue.route("/tokens/",methods=['POST'])
def get_token():
    '''获取一个口令，用于保持登陆'''
    params = request.get_json()
    return jsonify(IdentifyUtil.authenticate(params.get('username'), IdentifyUtil.hash_secret(params.get('password'))))

@user_blue.route("/selfid/",methods=["GET"])
@IdentifyUtil.login_required
def get_selfId():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    return jsonify(Common.trueReturn(userid,'query ok'))

@user_blue.route("/selfbases/",methods=["GET"])
@IdentifyUtil.login_required
def get_AllUserBase():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    return jsonify(UserApi.getUserBase(userid))

@user_blue.route("/selfinfos/",methods=["GET"])
@IdentifyUtil.login_required
def get_userinfo():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    return jsonify(UserApi.getUserInfoByUserid(userid))

@user_blue.route("/",methods=["POST"])
def register_Auths():
    '''注册一个账户，需要提供 post json 信息 
    {"username":"???","password":"???","realname":???,"idcard":???,"cellphone":???,"email":???,"avatarurl":???}'''
    params = request.get_json()
    if not params.get('emailcode') or not params.get('email'):
        return jsonify(Common.falseReturn(None,'emailcode if needed'))

    elif not ValidEmail.check_validcode_email(params.get('email'),params.get('emailcode'),0)['data']:
        return jsonify(Common.falseReturn(None,'please make sure email and code is matched'))
    if not params.get('username') or not params.get('password'):
        return jsonify(Common.falseReturn(None,'username or password cannot be empty'))
    base = UserApi.registerUserBase(params.get('username'),params.get('password'))
    if base.get('status'):
        info = UserApi.registerUserInfo(base.get('data').get('userid'),params.get('realname'),params.get('cellphone'),params.get('idcard'),params.get('email'),params.get('avatarurl'))
        return jsonify(info)
    return jsonify(base)

@user_blue.route("/usernames/",methods=["PUT"])
@IdentifyUtil.login_required
def change_username():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    params=request.get_json()
    if not params.get('username'):
        return jsonify(Common.falseReturn(None,'username cannot be empty'))
    return jsonify(UserApi.updateUserName(userid,params.get('username')))

@user_blue.route("/passwords/",methods=["PUT"])
@IdentifyUtil.login_required
def change_userpassword():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    params=request.get_json()
    if not params.get('oldpassword') or not params.get('newpassword'):
        return jsonify(Common.falseReturn(None,'newpassword or oldpassword cannot be empty'))
    user = UserApi.getUserBase(userid)
    if user['status'] and user['data'].get('password')==IdentifyUtil.hash_secret(params.get('oldpassword')):
        return jsonify(UserApi.updateUserPassword(userid,params.get('newpassword')))
    return jsonify(Common.falseReturn(None,'check old password wrong'))

@user_blue.route("/realnames/",methods=["PUT"])
@IdentifyUtil.login_required
def change_userRealname():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    params=request.get_json()
    if not params.get('realname'):
        return jsonify(Common.falseReturn(None,'realname cannot be empty'))
    return jsonify(UserApi.updateRealName(userid,params.get('realname')))

@user_blue.route("/idcards/",methods=["PUT"])
@IdentifyUtil.login_required
def change_userIDCard():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    params=request.get_json()
    if not params.get('idcard'):
        return jsonify(Common.falseReturn(None,'idcard cannot be empty'))
    return jsonify(UserApi.updateIDCard(userid,params.get('idcard')))

@user_blue.route("/cellphones/",methods=["PUT"])
@IdentifyUtil.login_required
def change_userPhone():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    params=request.get_json()
    if not params.get('cellphone'):
        return jsonify(Common.falseReturn(None,'cellphone cannot be empty'))
    return jsonify(UserApi.updatePhone(userid,params.get('cellphone')))

@user_blue.route("/emails/",methods=["PUT"])
@IdentifyUtil.login_required
def change_userEmail():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    params=request.get_json()
    if not params.get('email'):
        return jsonify(Common.falseReturn(None,'email cannot be empty'))
    return jsonify(UserApi.updateEmail(userid,params.get('email')))

@user_blue.route("/avatars/",methods=["PUT"])
@IdentifyUtil.login_required
def change_userAvatar():
    userid = IdentifyUtil.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    params=request.get_json()
    if not params.get('avatar'):
        return jsonify(Common.falseReturn(None,'avatarUrl cannot be empty'))
    return jsonify(UserApi.updateAvatar(userid,params.get('avatar')))

@user_blue.route("/usernames/<userid>",methods=["GET"])
def get_username(userid):
    return jsonify(UserApi.getUserNameById(userid))

@user_blue.route("/avatars/<userid>",methods=["GET"])
def get_userAvatar(userid):
    return jsonify(UserApi.getUserAvatarById(userid))

@user_blue.route("/userids/<username>",methods=["GET"])
def get_UserIdByName(username):
    res = UserApi.getUserBaseByName(username)
    if res['status']:
        return jsonify(Common.trueReturn(res['data']['id'],'ok'))
    else:
        return jsonify(Common.falseReturn(None,'no user'))

@user_blue.route("/emails/<userid>",methods=["GET"])
def get_UserEmail(userid):
    res = UserApi.getUserInfoByUserid(userid)
    if res['status']:
        return jsonify(Common.trueReturn(res['data']['email'],'ok'))
    return jsonify(Common.falseReturn(None,'no user'))


@user_blue.route("/resets/passwords/",methods=["POST"])
def reset_password():
    params = request.get_json()
    if not params.get('emailcode') or not params.get('userid') or not params.get('password'):
        return jsonify(Common.falseReturn(None,'emailcode and userid and password should not empty'))
    userbase = UserApi.getUserBase(params.get('userid'))
    if userbase['status']:
        userinfo = UserApi.getUserInfoByUserid(userbase['data']['id'])
        if userinfo['status']:
            res = ValidEmail.check_validcode_email(userinfo['data']['email'],params.get('emailcode'),1)
            if res['status']:
                return jsonify(UserApi.updateUserPassword(params.get('userid'),params.get('password')))
            else:
                return jsonify(Common.falseReturn(None,'check code wrong'))
        else:
            return jsonify(Common.falseReturn(None,'get email wrong'))
    else:
        return jsonify(Common.falseReturn(None,'user not exist'))

