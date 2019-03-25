import pymysql,sqlite3,os
from .OperateDB import OperateDB

class mysqlDB(OperateDB):
    '''mysql connection'''
    def __init__(self,host='localhost',port=3306,user='root',passwd='testpassword',dbname='dbname',sqlFiles=None):
        #先创建一下数据库，防止链接不上
        OperateDB.__init__(self,database=pymysql.connect(host=host, port=port, user=user, passwd=passwd,db=dbname),databaseType="mysql",sqlfiles=sqlFiles)


class sqliteDB(OperateDB):
    '''sqlite connection'''
    def __init__(self,dbname,sqlFiles=None):
        # 将文件路径分割出来
        file_dir = os.path.split(dbname)[0]
        # 判断文件路径是否存在，如果不存在，则创建，此处是创建多级目录
        if not os.path.isdir(file_dir):
            os.makedirs(file_dir)
        OperateDB.__init__(self,database=sqlite3.connect(dbname,check_same_thread=False),databaseType="sqlite",sqlfiles=sqlFiles)



