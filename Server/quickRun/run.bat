cd /d %~dp0
cd ..
call .\venv\Scripts\activate
python ..\app\main.py runserver -h 0.0.0.0 -p 4444 -d