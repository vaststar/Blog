#！/bin/bash
python -m pip install --upgrade pip
pip install virtualenv
virtualenv venv
source venv/bin/activate
pip install -r requirements
cd app
python main.py runserver -h 0.0.0.0 -p 4444 -d