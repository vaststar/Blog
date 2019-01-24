import uuid
import sqlite3

class sqliteDB(object):
    def __init__(self,dbname):
        self.db = sqlite3.connect(dbname,check_same_thread=False)
        self.cursor = self.db.cursor()

    def  getAllUser(self):
        self.cursor.execute('SELECT * FROM user_base')
        return self.cursor.fetchall()

    @staticmethod
    def __GenerateUUID__():
        return "".join(str(uuid.uuid1()).split('-'))
