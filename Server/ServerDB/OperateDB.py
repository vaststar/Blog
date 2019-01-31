import abc
from .BaseDB import BaseDB

class OperateDB(BaseDB,metaclass=abc.ABCMeta):
    '''中间层业务相关的operate，可能变化的数据库相关操作放在这里'''
    def __init__(self,datebase,sqlfiles=None):
        BaseDB.__init__(self,datebase,sqlfiles)

#业务相关放在这之后，比如取数据，注册之类的
    def getAllUser(self):
        self._ExecuteSQL('SELECT * FROM user_base')
        return self._FetchAll()

    def getUserByName(self,username):
        self._ExecuteSQL('SELECT * FROM user_base WHERE username=\'{}\''.format(username))
        return self._FetchOne()

    def getUserById(self,userid):
        self._ExecuteSQL('SELECT * FROM user_base WHERE userid=\'{}\''.format(userid))
        return self._FetchOne()

    def addUser(self,username,password):
        if not self.getUserByName(username) and username.strip()!='' and password.strip() != '':
            userid = BaseDB.GenerateUUID()
            if self._ExecuteSQL('INSERT INTO user_base VALUES (\'{}\',\'{}\',\'{}\')'.
                                format(userid,username,password)):
                self._CommitChange()
                return userid
        return None

    def checkPassword(self,username,password):
        user =self.getUserByName(username)
        print(user)
        if not user is None:
            if password == user[2]:
                return user[0]
        return None


