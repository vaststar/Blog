from flask import jsonify,request
from functools import wraps
import hashlib,datetime

from app.ServerView.Authority.Authority import Authority
from app.ServerView.Common import Common
from app.ServerDB import blogDB
from app.ServerConfig import config

class IdentifyUtil(object):
    @staticmethod#对数据库存入的密码加密，sault取config中的内容
    def hash_secret(secret):
        obj = hashlib.md5(config.SECRET_SAULT)
        obj.update(secret.encode('utf-8'))
        return obj.hexdigest()

    @staticmethod
    def authenticate(username,password):
        '''登陆验证，成功则返回token'''
        userid =  blogDB.checkPassword(username,password)
        if not userid is None:
            payload = Authority.encode_jwt(userid)
            return Common.trueReturn(payload.decode(),"Get Token OK")
        else:
            return Common.falseReturn(None,'Get Token Flase')

    @staticmethod
    def identify(auth_request):
        '''用户鉴权*'''
        auth_header = auth_request.headers.get('Authorization')
        if auth_header:
            auth_tokenArr = auth_header.split(" ")
            if not auth_tokenArr or auth_tokenArr[0] != 'JWT' or len(auth_tokenArr) != 2:
                return Common.falseReturn(None, 'Please Make Sure JWT Token in Autorization')
            else:
                auth_token = auth_tokenArr[1]
                payload = Authority.decode_jwt(auth_token)
                if not isinstance(payload, str):
                    user = blogDB.getUserById(payload['data']['id'])
                    if not user is None:
                        return Common.trueReturn(payload['data']['id'], 'Account Verify OK')
                    else:
                        return Common.falseReturn(None, 'Account Verify Wrong')
                else:
                    return Common.falseReturn(None, 'Token Verify Wrong')
        else:
            return Common.falseReturn(None, 'Please Make Sure Authorization in Header')

    @staticmethod
    def login_required(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            res = IdentifyUtil.identify(request)
            if res.get('status'):
                return func(*args, **kwargs)
            else:
                return jsonify(res)
        return wrapper

    @staticmethod
    def get_user_id():
        res = IdentifyUtil.identify(request)
        if res.get('status'):
            return res.get('data')
        return None

    @staticmethod
    def robot_defend(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            robot_header = request.headers.get('Robot-Detect')
            if robot_header is not None:
                current = datetime.datetime.strftime(datetime.datetime.utcnow(), "%Y-%m-%d %H:%M:HEADER").encode('utf-8')
                curHash = hashlib.md5()
                curHash.update(current)
                if curHash.hexdigest() == robot_header:
                    return func(*args, **kwargs)
                else:
                    before = datetime.datetime.strftime(datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=-1, seconds=0),
                                                        "%Y-%m-%d %H:%M:HEADER").encode('utf-8')
                    beforeHash=hashlib.md5()
                    beforeHash.update(before)
                    if beforeHash.hexdigest() == robot_header:
                        return func(*args, **kwargs)
                    else :
                        after = datetime.datetime.strftime(datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=1, seconds=0),
                                                            "%Y-%m-%d %H:%M:HEADER").encode('utf-8')
                        aftereHash = hashlib.md5()
                        aftereHash.update(after)
                        if aftereHash.hexdigest() == robot_header:
                            return func(*args, **kwargs)
            return jsonify(Common.falseReturn(None,"you are robot"))
        return wrapper


