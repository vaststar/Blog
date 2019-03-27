import gevent.monkey
gevent.monkey.patch_all()

import multiprocessing

debug = True
loglevel = 'debug'
bind = "0.0.0.0:4444"
# pidfile = "./log/gunicorn.pid"
# accesslog = "./log/access.log"
# errorlog = "./log/debug.log"
daemon = True
reload = True

workers = multiprocessing.cpu_count()* 2 + 1
worker_class = 'gevent'
x_forwarded_for_header = 'X-FORWARDED-FOR'

logconfig_dict = {
    'version':1,
    'disable_existing_loggers': False,
    'loggers':{
        "gunicorn.error": {
            "level": "DEBUG",# 打日志的等级可以换的，下面的同理
            "handlers": ["error_file"], # 对应下面的键
            "propagate": 1,
            "qualname": "gunicorn.error"
        },

        "gunicorn.access": {
            "level": "DEBUG",
            "handlers": ["access_file"],
            "propagate": 0,
            "qualname": "gunicorn.access"
        }
    },
    'handlers':{
        "error_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "maxBytes": 1024*1024*1024,# 打日志的大小，我这种写法是1个G
            "backupCount": 1,# 备份多少份，经过测试，最少也要写1，不然控制不住大小
            "formatter": "generic",# 对应下面的键
            "filename": "./log/debug.log"# 打日志的路径
        },
        "access_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "maxBytes": 1024*1024*1024,
            "backupCount": 1,
            "formatter": "generic",
            "filename": "./log/access.log"
        }
    },
    'formatters':{
        "generic": {
            "format": "'[%(process)d] [%(asctime)s] %(levelname)s [%(filename)s:%(lineno)s] %(message)s'", # 打日志的格式
            "datefmt": "[%Y-%m-%d %H:%M:%S %z]",# 时间显示方法
            "class": "logging.Formatter"
        },
        "access": {
            "format": "'[%(process)d] [%(asctime)s] %(levelname)s [%(filename)s:%(lineno)s] %(message)s'",
            "class": "logging.Formatter"
        }
    }
}
