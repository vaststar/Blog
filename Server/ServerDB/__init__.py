from Server.ServerConfig import config
from Server.ServerDB.mysqlDB import mysqlDB
from Server.ServerDB.sqliteDB import sqliteDB

blogDB = None
if config.DB_TYPE == "Sqlite":
    blogDB = sqliteDB(config.SQLITE_DBNAME)
elif config.DB_TYPE == "Mysql":
    blogDB = mysqlDB(config.MYSQL_IP,config.MYSQL_PORT,config.MYSQL_USER,config.MYSQL_PASSWORD,'blog')
else:
    blogDB = sqliteDB(config.SQLITE_DBNAME)