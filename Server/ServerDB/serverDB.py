from .OperateDB import OperateDB
import pymysql,sqlite3

class mysqlDB(OperateDB):
    '''mysql connection'''
    def __init__(self,host='localhost',port=3306,user='root',passwd='testpassword',dbname='dbname',sqlFiles=None):
        OperateDB.__init__(self,pymysql.connect(host=host, port=port, user=user, passwd=passwd,db=dbname),sqlFiles)



class sqliteDB(OperateDB):
    '''sqlite connection'''
    def __init__(self,dbname,sqlFiles=None):
        print(dbname)
        OperateDB.__init__(self,sqlite3.connect(dbname,check_same_thread=False),sqlFiles)



