import gevent.monkey
gevent.monkey.patch_all()

import multiprocessing

debug = True
loglevel = 'debug'
bind = "0.0.0.0:4444"
pidfile = "./log/gunicorn.pid"
accesslog = "./log/access.log"
errorlog = "./log/debug.log"
daemon = True
reload = True

workers = multiprocessing.cpu_count()* 2 + 1
worker_class = 'gevent'
x_forwarded_for_header = 'X-FORWARDED-FOR'
