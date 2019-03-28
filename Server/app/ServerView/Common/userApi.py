from app.ServerDB import blogDB
from app.ServerView.Common import Common
from app.ServerView.Common.Identify import IdentifyUtil

class UserApi(object):
    '''定义一些用户相关的接口，给视图调用，减少视图工作量'''
    @staticmethod
    def getUserBase(userid):
        user = blogDB.getUserById(userid)
        if user is not None:
            return Common.trueReturn(dict(zip(("id", "name", "password"), user)),'query ok')
        return Common.falseReturn(None,'cannot find userid:{}'.format(userid))

    @staticmethod
    def registerUserBase(username,password):
        if not username or not password:
            return Common.falseReturn(None, 'username or password cannot be empty')
        if blogDB.getUserByName(username) is not None:
            return Common.falseReturn(None,'{} is already exists'.format(username))
        userid = blogDB.addUser(username, IdentifyUtil.hash_secret(password))
        if userid is not None:
            return Common.trueReturn({'userid':userid},'register ok')
        else :
            return Common.falseReturn('unknown reason','register wrong')
    @staticmethod
    def updateUserBase(userid,username,password):
        if not blogDB.getUserById(userid):
            return Common.falseReturn(None, "{} doesn't exist in user_base".format(userid))
        if not username or not password:
            return Common.falseReturn(None, 'username or password cannot be empty')
        if blogDB.updateUser(userid,username,IdentifyUtil.hash_secret(password)):
            return Common.trueReturn({'userid':userid},'change ok')
        else:
            return Common.falseReturn(None,'change false')

    @staticmethod
    def updateUserName(userid,username):
        if blogDB.updateUserName(userid,username):
            return Common.trueReturn(userid,'change name ok')
        return Common.falseReturn(None,"change name error")

    @staticmethod
    def updateUserPassword(userid,password):
        if blogDB.updateUserPassword(userid,IdentifyUtil.hash_secret(password)):
            return Common.trueReturn(userid,'change password ok')
        return Common.falseReturn(None,"change password error")

    @staticmethod
    def getUserInfoByUserid(userid):
        if not userid:
            return Common.falseReturn(None,'userid is required')
        user = blogDB.getUserInfoById(userid)
        if user:
            return Common.trueReturn(dict(zip(("userid","realname","idcard","cellphone","email","avatarurl"),user)), 'query ok')
        else:
            return Common.falseReturn(None, 'cannot find {}'.format(userid))

    @staticmethod
    def registerUserInfo(userid,realname,phone,idcard,email,avatarurl):
        if not blogDB.getUserById(userid) :
            return Common.falseReturn(None,"{} doesn't exist in user_base".format(userid))
        if not realname or not phone or not idcard or not email:
            return Common.falseReturn(None,'params cannot be none')
        if not blogDB.getUserInfoById(userid) is None:
            return Common.falseReturn(None,"{} is already exists in user_info ".format(userid))
        if blogDB.addUserInfo(userid, realname, idcard, phone, email,avatarurl):
            return Common.trueReturn(userid,'register ok')
        else:
            return Common.falseReturn(None,'unknown reason')

    @staticmethod
    def updateUserInfo(userid,realname,phone,idcard,email,avatarurl):
        if not realname or not phone or not idcard or not email:
            return Common.falseReturn(None,'params cannot be none')
        if not blogDB.getUserInfoById(userid) :
            return Common.falseReturn(None,"{} doesn't exist in user_info".format(userid))
        if blogDB.updateUserInfo(userid,realname,idcard,phone,email,avatarurl):
            return Common.trueReturn(userid,'modify ok')
        else:
            return Common.falseReturn(None,'unknown reason')

    @staticmethod
    def updateRealName(userid,realname):
        if blogDB.updateUserRealName(userid,realname):
            return Common.trueReturn(userid,'change realname ok')
        return Common.falseReturn(None,'change realname error')
    @staticmethod
    def updatePhone(userid,phone):
        if blogDB.updateUserCellphone(userid,phone):
            return Common.trueReturn(userid,'change phone ok')
        return Common.falseReturn(None,'change phone error')
    @staticmethod
    def updateIDCard(userid,idcard):
        if blogDB.updateUserIDCard(userid,idcard):
            return Common.trueReturn(userid,'change idcard ok')
        return Common.falseReturn(None,'change idcard error')
    @staticmethod
    def updateEmail(userid,email):
        if blogDB.updateUserEmail(userid,email):
            return Common.trueReturn(userid,'change email ok')
        return Common.falseReturn(None,'change email error')
    @staticmethod
    def updateAvatar(userid,avatarurl):
        if blogDB.updateUserAvatar(userid,avatarurl):
            return Common.trueReturn(userid,'change avatar ok')
        return Common.falseReturn(None,'change avatar error')

    @staticmethod
    def getAllUserBase():
        result=[]
        for k,v in enumerate(blogDB.getAllUser()):
            result.append(dict(zip(("id","name","password"),v)))
        return Common.trueReturn(result,'query ok')

    @staticmethod
    def getAllUserInfo():
        result=[]
        for k,v in enumerate(blogDB.getAllUserInfo()):
            result.append(dict(zip("userid,realname,idcard,cellphone,email,avatarurl"),v))
        return Common.trueReturn(result,'query ok')

    @staticmethod
    def getUserBaseByName(username):
        if not username:
            return Common.falseReturn(None,'username is none')
        user = blogDB.getUserByName(username)
        if user:
            return Common.trueReturn(dict(zip(("id", "name", "password"), user)),'query ok')
        else:
            return Common.falseReturn(None,'cannot find {}'.format(username))

    @staticmethod
    def getUserNameById(userid):
        if not userid:
            return Common.falseReturn(None,'userid is required')
        user = blogDB.getUserById(userid)
        if user:
            return Common.trueReturn(user[1],'query ok')
        else:
            return Common.falseReturn(None,'not found')

    @staticmethod
    def getUserAvatarById(userid):
        if not userid:
            return Common.falseReturn(None,'userid is required')
        user = blogDB.getUserInfoById(userid)
        if user:
            return Common.trueReturn(user[-1],'query ok')
        else:
            return Common.falseReturn(None,'not found')



