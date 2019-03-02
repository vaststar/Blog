#！/bin/bash
gunicorn -c gunicorn_config.py app.main:app
exec /bin/bash