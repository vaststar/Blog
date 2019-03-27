import os
import logging.config

logging.config.fileConfig(os.path.join(os.path.dirname(os.path.abspath(__file__)),'log.ini'))
logger=logging.getLogger('server')
logger.setLevel(logging.DEBUG)