import pymysql

class mysqlDB(object):
    def __init__(self,host='localhost',port=3306,user='root',passwd='ZZT06118115',dbname='dbname'):
        self.db = pymysql.connect(host=host, port=port, user=user, passwd=passwd,db=dbname)
        self.cursor = self.db.cursor()

    def getAllUser(self):
        self.cursor.execute('SELECT * FROM user_base')
        return self.cursor.fetchall()

    def getUserByName(self,username):
        self.cursor.execute('SELECT * FROM user_base WHERE username=\'{}\''.format(username))
        return self.cursor.fetchone()

    def getUserById(self,userid):
        self.cursor.execute('SELECT * FROM user_base WHERE userid=\'{}\''.format(userid))
        return self.cursor.fetchone()

    def addUser(self,username,password):
        if self.getUserByName(username) is None:
            self.cursor.execute('INSERT INTO user_base VALUES (replace(uuid(),\'-\',\'\'),\'{}\',\'{}\')'.
                                format(username,password))
            self.db.commit()
            return True
        else:
            return False



