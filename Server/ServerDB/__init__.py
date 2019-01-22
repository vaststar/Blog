from Server.ServerConfig import config
from Server.ServerDB.mysqlDB import mysqlDB

blogDB = mysqlDB(config.MYSQL_IP,config.MYSQL_PORT,config.MYSQL_USER,config.MYSQL_PASSWORD,'blog')