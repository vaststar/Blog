import sqlite3,mysql.connector,os

from .DBOperate import DBOperate
from app.ServerConfig import config

blogDB = None
if config.DB_TYPE == "Sqlite":
    from .SqliteBase import SqliteBase
    if not os.path.isdir(os.path.dirname(config.SQLITE_SET['DBPATH'])):
        os.mkdir(os.path.dirname(config.SQLITE_SET['DBPATH']))
    database = SqliteBase(sqlite3.connect(config.SQLITE_SET.get("DBPATH"), check_same_thread=False),config.SQLITE_SET.get("sqlFile"))
    blogDB = DBOperate(database,'sqlite')
elif config.DB_TYPE == "Mysql":
    from .MysqlBase import MysqlBase
    while True:
        try:
            coon = mysql.connector.connect(host=config.MYSQL_SET.get("IP"), port=config.MYSQL_SET.get("PORT"), user=config.MYSQL_SET.get("USER"), password =config.MYSQL_SET.get("PASSWORD"),
                                           database="blog",autocommit=True)
            break
        except Exception as e:
            print(e)

    database = MysqlBase(coon,config.MYSQL_SET.get("sqlFile"))
    blogDB = DBOperate(database,'mysql')
else:
    from .SqliteBase import SqliteBase
    if not os.path.isdir(os.path.dirname(config.SQLITE_SET['DBPATH'])):
        os.mkdir(os.path.dirname(config.SQLITE_SET['DBPATH']))
    database = SqliteBase(sqlite3.connect(config.SQLITE_SET.get("DBPATH"), check_same_thread=False),config.SQLITE_SET.get("sqlFile"))
    blogDB = DBOperate(database,'sqlite')
