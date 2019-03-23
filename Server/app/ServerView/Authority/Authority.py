import jwt,datetime

from app.ServerConfig import config

class Authority(object):
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
