from Server.ServerView.user import user_blue
from Server.ServerView.article import article_blue
from Server.ServerView.Common import file_blue

BLUEPRINT = {"/users":user_blue,"/articles":article_blue,"/files":file_blue}