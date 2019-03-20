from flask import jsonify,request
from . import code_blue

from app.ServerView.Common import Common
from app.ServerView.Common.validCode import ValidCode
from app.ServerView.Common.validCode import ValidEmail
from app.ServerView.Common.userApi import UserApi

@code_blue.route("/validcodes/",methods=["GET"])
def get_validcodes():
    code = ValidCode.getBase64Code()
    return jsonify(Common.trueReturn({'base64':code[0].decode(encoding="utf-8"),'code':code[1]},'ok'))

@code_blue.route("/validemails/",methods=["POST"])
def post_validemail():
    params = request.get_json()
    if 'userid' not in params:
        return jsonify(Common.falseReturn(None,'please input userid'))
    #根据id获取email
    userinfo = UserApi.getUserInfoByUserid(params.get('userid'))
    if userinfo['status']:
        return jsonify(ValidEmail.post_changePassword_email(userinfo['data']['email']))
    else:
        return jsonify(Common.falseReturn(None,'no user'))
    
