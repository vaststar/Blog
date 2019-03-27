import sqlite3,pymysql

from .DBOperate import DBOperate
from app.ServerConfig import config

blogDB = None
if config.DB_TYPE == "Sqlite":
    from .SqliteBase import SqliteBase
    database = SqliteBase(sqlite3.connect(config.SQLITE_SET.get("DBPATH"), check_same_thread=False),config.SQLITE_SET.get("sqlFile"))
    blogDB = DBOperate(database,'sqlite')
elif config.DB_TYPE == "Mysql":
    from .MysqlBase import MysqlBase
    database = MysqlBase(pymysql.connect(host=config.MYSQL_SET.get("IP"), port=config.MYSQL_SET.get("PORT"), user=config.MYSQL_SET.get("USER"), passwd=config.MYSQL_SET.get("PASSWORD"),
                                         db="blog",autocommit=True),config.MYSQL_SET.get("sqlFile"))
    blogDB = DBOperate(database,'mysql')
else:
    from .SqliteBase import SqliteBase
    database = SqliteBase(sqlite3.connect(config.SQLITE_SET.get("DBPATH"), check_same_thread=False),config.SQLITE_SET.get("sqlFile"))
    blogDB = DBOperate(database,'sqlite')
