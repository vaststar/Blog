from app.ServerView.user import user_blue
from app.ServerView.article import article_blue
from app.ServerView.Common import file_blue

BLUEPRINT = {"/users":user_blue,"/articles":article_blue,"/files":file_blue}