import uuid,abc
class BaseDB(object,metaclass=abc.ABCMeta):
    '''数据库基类，构建时可以传入sql文件进行执行，文件内以//分割表达式'''
    def __init__(self,database,databaseType="sqlite",sqlfiles=None):
        self.__db = database
        self.__cursor = self.__db.cursor()
        self.__InitSQLFile(sqlfiles)
        self._dbType = databaseType

    def __InitSQLFile(self,sqlfilepaths):
        for v in sqlfilepaths:
            with open(v, 'r') as f:
                statement = ''
                for line in f:
                    if line.strip().startswith('-') or line.strip()=='':
                        continue
                    else:
                        statement+=line.strip()
                    if line.strip().endswith(';'):
                        self._ExecuteSQL(statement)
                        statement=""
        self._CommitChange()

    def _ExecuteSQL(self,command):
        try:
            self.__cursor.execute(command)
            return True
        except Exception as e:
            print(e)
            return False

    def _ExecuteScripts(self,command):
        try:
            self.__cursor.executescript(command)
            return True
        except Exception as e:
            print(e)
            return False

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