import abc
class ServerDBBase(object,metaclass=abc.ABCMeta):
    '''数据库基类，构建时可以传入sql文件进行执行，文件内以//分割表达式'''
    def __init__(self,database,sqlfiles=None):
        self.__db = database
        self.__InitSQLFile(sqlfiles)

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

    def _GetConnect(self):
        return self.__db

    def _GetCursor(self):
        return self.__db.cursor()

    @abc.abstractmethod
    def _ExecuteSQL(self,command):
        pass

    @abc.abstractmethod
    def _QueryOneSQL(self,command):
        pass

    @abc.abstractmethod
    def _QueryAllSQL(self,command):
        pass