import sqlite3
from .ServerDBBase import ServerDBBase
from app.ServerLog import logger

class SqliteBase(ServerDBBase):
    def __init__(self, database, sqlfiles=None):
        ServerDBBase.__init__(self,database,sqlfiles)

    def _ExecuteSQL(self,command):
        conn= self._GetConnect()
        try:
            with conn:
                conn.execute(command)
                return True
        except (sqlite3.OperationalError, sqlite3.IntegrityError) as e:
            logger.warning('Could not complete operation:', command,e)
            return False

    def _QueryOneSQL(self,command):
        cursor = self._GetCursor()
        try:
            cursor.execute(command)
            return cursor.fetchone()
        except (sqlite3.OperationalError, sqlite3.IntegrityError) as e:
            logger.warning('Could not complete operation:', command,e)
            return None

    def _QueryAllSQL(self,command):
        cursor = self._GetCursor()
        try:
            cursor.execute(command)
            return cursor.fetchall()
        except (sqlite3.OperationalError, sqlite3.IntegrityError) as e:
            logger.warning('Could not complete operation:', command,e)
            return []
