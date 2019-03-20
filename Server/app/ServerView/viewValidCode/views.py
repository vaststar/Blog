from flask import jsonify,request
from . import code_blue

from app.ServerView.Common import Common
from app.ServerView.Common.validCode import ValidCode

@code_blue.route("/validcodes/",methods=["GET"])
def get_validcodes():
    code = ValidCode.getBase64Code()
    return jsonify(Common.trueReturn({'base64':code[0].decode(encoding="utf-8"),'code':code[1]},'ok'))

@code_blue.route("/validemails/",methods=["POST"])
def post_validemail():
    params = request.get_json()
    username=params.get('username')
    
