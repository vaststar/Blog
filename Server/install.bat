cd /d %~dp0
python -m pip install --upgrade pip
pip install virtualenv
virtualenv venv
call .\venv\Scripts\activate
pip install -r requirements
python app\main.py runserver -h 0.0.0.0 -p 4444 -d