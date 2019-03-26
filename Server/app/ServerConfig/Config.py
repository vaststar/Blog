import os,datetime
#数据库等
class Config(object):
    #数据库配置
    MYSQL_SET = {
                 "IP":"blog_mysql", "PORT":3306, "USER":"root", "PASSWORD":"root",
                 "sqlFile":[]
                }
    SQLITE_SET = {
                  "DBPATH":os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),'DB','blog_sqlite.db'),
                  "sqlFile":[
                             os.path.join(os.path.dirname(os.path.realpath(__file__)),'SqlFile','sqlite_sql.sql')
                             # ,os.path.join(os.getcwd(), 'ServerDB/SqlFile', 'sqlite_test_data')
                            ]
                 }
    #启用数据库类型Sqlite or Mysql
    DB_TYPE = "Sqlite"

    #用户密码加密salt
    SECRET_SAULT = b"secret_sault"

    #JWT验证参数
    JWT_SET = {
                "expiration":datetime.timedelta(days=1,minutes=1,seconds=0),"secret":"JWT_secret"
              }
    #静态文件路径
    STATIC_FILE_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),"StaticFile")

    #验证邮箱信息
    SEND_EMAIL_CONF = {"user":"47029316@qq.com","key":"rvueixdphgjdbjeb"}

class DevelopmentConfig(Config):
    '''开发环境配置'''
    DB_TYPE = "Sqlite"

class ProductionConfig(Config):
    '''生产环境配置'''
    DB_TYPE = "Mysql"
