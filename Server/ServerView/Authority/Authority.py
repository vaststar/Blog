import jwt,hashlib,datetime,time
from flask import jsonify,request
from functools import wraps

from Server.ServerView.Common import Common

from Server.ServerConfig import config
from Server.ServerDB import blogDB

class Authority(object):
    @staticmethod#对数据库存入的密码加密，sault取config中的内容
    def hash_secret(secret):
        obj = hashlib.md5(config.SECRET_SAULT)
        obj.update(secret.encode('utf-8'))
        return obj.hexdigest()

    @staticmethod
    def encode_jwt(userid):
        '''生成jwt'''
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + config.JWT_SET.get("expiration"),
                'iat': datetime.datetime.utcnow(),
                'iss': 'ken',
                'data': {
                    'id': userid
                }
            }
            return jwt.encode(
                payload,
                config.JWT_SET.get("secret"),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_jwt(auth_token):
        '''解析jwt'''
        try:
            payload = jwt.decode(auth_token,config.JWT_SET.get("secret"))
            if 'id' in payload.get('data'):
                return payload
            else:
                return "Invalid Token"
        except jwt.ExpiredSignatureError:
            return "Token Is Expired"
        except Exception as e:
            return str(e)

    @staticmethod
    def authenticate(username,password):
        '''登陆验证，成功则返回token'''
        userid =  blogDB.checkPassword(username,password)
        if not userid:
            payload = Authority.encode_jwt(userid)
            return jsonify(Common.trueReturn(payload.decode(),"Get Token OK"))
        else:
            return jsonify(Common.falseReturn(None,'Get Token Flase'))

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
                    user =  blogDB.getUserById(payload['data']['id'])
                    if not user:
                        return Common.trueReturn(payload['data']['id'],'Account Verify OK')
                    else:
                        return Common.falseReturn(None,'Account Verify Wrong')
                else:
                    return Common.falseReturn(None,'Token Verify Wrong')
        else:
            return Common.falseReturn(None,'Please Make Sure Authorization in Header')

def login_required(func):
    @wraps(func)
    def wrapper(*args,**kwargs):
        res = Authority.identify(request)
        if res.get('status'):
            return func(*args,**kwargs)
        else :
            return jsonify(res)
    return wrapper