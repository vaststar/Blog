#数据库等
class Config(object):
    #Mysql数据库配置
    MYSQL_IP = "localhost"
    MYSQL_PORT = 3306
    MYSQL_USER = "root"
    MYSQL_PASSWORD = "ZZT06118115"
    #sqlite3数据库名称
    SQLITE_DBNAME = 'blog_sqlite.db'
    #启用数据库类型Sqlite or Mysql
    DB_TYPE = "Sqlite"
    #蓝图名称
