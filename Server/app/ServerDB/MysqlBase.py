from .ServerDBBase import ServerDBBase
from app.ServerLog import logger

class MysqlBase(ServerDBBase):
    def __init__(self, database, sqlfiles=None):
        ServerDBBase.__init__(self,database,sqlfiles)

    def _ExecuteSQL(self,command):
        try:
            self.__KeepAlive()
            self._GetConnect().cursor().execute(command)
            return True
        except Exception as e:
            logger.warning('Could not complete operation:'+ command+str(e))
            return False

    def _QueryOneSQL(self,command):
        try:
            self.__KeepAlive()
            cursor =  self._GetConnect().cursor()
            cursor.execute(command)
            return cursor.fetchone()
        except Exception as e:
            logger.warning('Could not query one:'+ command+str(e))
            return None

    def _QueryAllSQL(self,command):
        try:
            self.__KeepAlive()
            cursor=self._GetConnect().cursor()
            cursor.execute(command)
            return cursor.fetchall()
        except Exception as e:
            logger.warning('Could not query all:'+ command+str(e))
            return []

    def __KeepAlive(self):
        if not self._GetConnect().is_connected():
            self._GetConnect().reconnect()


