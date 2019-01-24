import uuid,abc
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
                    self._ExecuteSQL(t)
        self._CommitChange()

    def _ExecuteSQL(self,command):
        self.__cursor.execute(command)

    def _CommitChange(self):
        self.__db.commit()

    def _RollbackChange(self):
        self.__db.rollback()

    def CloseConnect(self):
        self.__db.close()

    def _FetchAll(self):
        return self.__cursor.fetchall()

    def _FetchOne(self):
        return self.__cursor.fetchone()
    @staticmethod
    def GenerateUUID():
        return "".join(str(uuid.uuid1()).split('-'))