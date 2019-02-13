import abc
from .BaseDB import BaseDB

class OperateDB(BaseDB,metaclass=abc.ABCMeta):
    '''中间层业务相关的operate，可能变化的数据库相关操作放在这里'''
    def __init__(self,datebase,sqlfiles=None):
        BaseDB.__init__(self,datebase,sqlfiles)

#业务相关放在这之后，比如取数据，注册之类的
#用户基本表
    def getAllUser(self):
        self._ExecuteSQL('SELECT * FROM user_base')
        return self._FetchAll()
    
    #根据用户名获取基本表内容
    def getUserByName(self,username):
        self._ExecuteSQL('SELECT * FROM user_base WHERE username=\'{}\''.format(username))
        return self._FetchOne()

    #根据用户id获取基本表内容
    def getUserById(self,userid):
        self._ExecuteSQL('SELECT * FROM user_base WHERE userid=\'{}\''.format(userid))
        return self._FetchOne()

    #添加一个用户（基本表内添加）
    def addUser(self,username,password):
        userid = BaseDB.GenerateUUID()
        if self._ExecuteSQL('INSERT INTO user_base (userid,username,password) VALUES (\'{}\',\'{}\',\'{}\')'.
                            format(userid,username,password)):
            self._CommitChange()
            return userid
        return None

    #检查用户密码
    def checkPassword(self,username,password):
        user =self.getUserByName(username)
        print(user)
        if not user is None:
            if password == user[2]:
                return user[0]
        return None

#用户信息表
    # 获取所有用户信息
    def getAllUserInfo(self):
        self._ExecuteSQL('SELECT * FROM user_info')
        return self._FetchAll()

    #根据用户id获取该用户的信息
    def getUserInfoById(self,userid):
        self._ExecuteSQL('SELECT * FROM user_info WHERE userid=\'{}\''.format(userid))
        return self._FetchOne()

    #添加一个用户信息
    def addUserInfo(self,userid,realname,idcard,cellphone,email):
        if self._ExecuteSQL('INSERT INTO user_info (userid,realname,idcard,cellphone,email) VALUES(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.
                         format(userid,realname,idcard,cellphone,email)):
            self._CommitChange()
            return True
        return False



