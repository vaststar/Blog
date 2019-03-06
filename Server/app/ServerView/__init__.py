from app.ServerView.user import user_blue
from app.ServerView.article import article_blue
from app.ServerView.Common import file_blue

BLUEPRINT = {"/rest/users":user_blue,"/rest/articles":article_blue,"/rest/files":file_blue}