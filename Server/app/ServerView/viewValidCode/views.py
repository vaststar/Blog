from flask import jsonify,request
from . import code_blue

from app.ServerView.Common import Common
from app.ServerView.Common.validCode import ValidCode
from app.ServerView.Common.validCode import ValidEmail
from app.ServerView.Common.userApi import UserApi
from app.ServerView.Common.Identify import IdentifyUtil

@code_blue.before_request
@IdentifyUtil.robot_defend
def before_req():
    return None

@code_blue.route("/codes/",methods=["GET"])
def get_validcodes():
    code = ValidCode.getBase64Code()
    return jsonify(Common.trueReturn({'base64':code[0].decode(encoding="utf-8"),'code':code[1]},'ok'))

@code_blue.route("/emails/passwords/",methods=["POST"])
def post_validPasswordEmail():
    params = request.get_json()
    if 'userid' not in params:
        return jsonify(Common.falseReturn(None,'please input userid'))
    #根据id获取email
    userinfo = UserApi.getUserInfoByUserid(params.get('userid'))
    if userinfo['status']:
        return jsonify(ValidEmail.post_validcode_email(userinfo['data']['email'],"修改密码",1))
    else:
        return jsonify(Common.falseReturn(None,'no user'))

@code_blue.route("/emails/registers/", methods=["POST"])
def post_validRegisterEmail():
    params = request.get_json()
    if 'email' not in params:
        return jsonify(Common.falseReturn(None, 'please input email'))
    return jsonify(ValidEmail.post_validcode_email(params['email'],"注册账户",0))
