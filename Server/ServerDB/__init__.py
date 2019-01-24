from Server.ServerConfig import config
from .serverDB import mysqlDB,sqliteDB

blogDB = None
if config.DB_TYPE == "Sqlite":
    print(config.SQLITE_SET.get("DBPATH"))
    print(config.SQLITE_SET.get("sqlFile"))
    blogDB = sqliteDB(config.SQLITE_SET.get("DBPATH"),config.SQLITE_SET.get("sqlFile"))
elif config.DB_TYPE == "Mysql":
    blogDB = mysqlDB(config.MYSQL_SET.get("IP"),config.MYSQL_SET.get("PORT"),config.MYSQL_SET.get("USER"),config.MYSQL_SET.get("PASSWORD"),
                     'blog',config.MYSQL_SET.get("sqlFile"))
else:
    blogDB = sqliteDB(config.SQLITE_SET.get("DBPATH"),config.SQLITE_SET.get("sqlFile"))