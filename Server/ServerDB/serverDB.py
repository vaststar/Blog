import uuid,abc
import pymysql,sqlite3

class BaseDB(object,metaclass=abc.ABCMeta):
    '''数据库基类，构建时可以传入sql文件进行执行，文件内以//分割表达式'''
    def __init__(self,datebase,sqlfiles=None):
        self.__db = datebase
        self.__cursor = self.__db.cursor()
        self.__InitSQLFile(sqlfiles)

    def __InitSQLFile(self,sqlfilepaths):
        for v in sqlfilepaths:
            with open(v, 'r') as f:
                for t in f.read().split('//'):
                    self.__ExecuteSQL(t)
        self.__CommitChange()

    def __ExecuteSQL(self,command):
        self.__cursor.execute(command)

    def __CommitChange(self):
        self.__db.commit()

    def __RollbackChange(self):
        self.__db.rollback()

    def CloseConnect(self):
        self.__db.close()

    def __FetchAll(self):
        return self.__cursor.fetchall()

    def __FetchOne(self):
        return self.__cursor.fetchone()

    def getAllUser(self):
        self.__ExecuteSQL('SELECT * FROM user_base')
        return self.__FetchAll()

    def getUserByName(self,username):
        self.__ExecuteSQL('SELECT * FROM user_base WHERE username=\'{}\''.format(username))
        return self.__FetchOne()

    def getUserById(self,userid):
        self.__ExecuteSQL('SELECT * FROM user_base WHERE userid=\'{}\''.format(userid))
        return self.__FetchOne()

    def addUser(self,username,password):
        if self.getUserByName(username) is None:
            self.__ExecuteSQL('INSERT INTO user_base VALUES (\'{}\',\'{}\',\'{}\')'.
                                format(BaseDB.GenerateUUID(),username,password))
            self.__CommitChange()
            return True
        else:
            return False

    @staticmethod
    def GenerateUUID():
        return "".join(str(uuid.uuid1()).split('-'))


class mysqlDB(BaseDB):
    '''mysql connection'''
    def __init__(self,host='localhost',port=3306,user='root',passwd='testpassword',dbname='dbname',sqlFiles=None):
        BaseDB.__init__(self,pymysql.connect(host=host, port=port, user=user, passwd=passwd,db=dbname),sqlFiles)



class sqliteDB(BaseDB):
    '''sqlite connection'''
    def __init__(self,dbname,sqlFiles=None):
        BaseDB.__init__(self,sqlite3.connect(dbname,check_same_thread=False),sqlFiles)



