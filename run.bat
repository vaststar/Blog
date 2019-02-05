cd /d %~dp0
call .\venv\Scripts\activate
cd Server
python main.py runserver -h 0.0.0.0 -p 4444 -d