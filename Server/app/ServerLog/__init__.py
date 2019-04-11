import os
import logging.config

if not os.path.isdir(os.path.join(os.getcwd(),'log')):
    os.makedirs(os.path.join(os.getcwd(),'log'))
logging.config.fileConfig(os.path.join(os.path.dirname(os.path.abspath(__file__)),'log.ini'))
logger=logging.getLogger('server')
logger.setLevel(logging.DEBUG)