#!/bin/bash
gunicorn -c ./deploy/gunicorn_config.py app.main:app
tail -f /dev/null
