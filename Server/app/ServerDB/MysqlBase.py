import pymysql
from .ServerDBBase import ServerDBBase
from app.ServerLog import logger

class MysqlBase(ServerDBBase):
    def __init__(self, database, sqlfiles=None):
        ServerDBBase.__init__(self,database,sqlfiles)

    def _ExecuteSQL(self,command):
        try:
            with self._GetConnect().cursor() as cursor:
                cursor.execute(command)
                return True
        except (pymysql.OperationalError, pymysql.IntegrityError) as e:
            logger.warning('Could not complete operation:', command,e)
            return False

    def _QueryOneSQL(self,command):
        try:
            with self._GetConnect().cursor() as cursor:
                cursor.execute(command)
                return cursor.fetchone()
        except (pymysql.OperationalError, pymysql.IntegrityError) as e:
            logger.warning('Could not query one:', command,e)
            return None

    def _QueryAllSQL(self,command):
        try:
            with self._GetConnect().cursor() as cursor:
                cursor.execute(command)
                return cursor.fetchall()
        except (pymysql.OperationalError, pymysql.IntegrityError) as e:
            logger.warning('Could not query all:', command,e)
            return []
