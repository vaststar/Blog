cd /d %~dp0
python -m pip install --upgrade pip
pip install virtualenv
virtualenv venv
call .\venv\Scripts\activate
pip install -r requirements
cd Server
python main.py