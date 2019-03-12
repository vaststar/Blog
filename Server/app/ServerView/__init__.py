from app.ServerView.viewUser import user_blue
from app.ServerView.viewArticle import article_blue
from app.ServerView.viewFileService import file_blue

BLUEPRINT = {"/rest/users":user_blue,"/rest/articles":article_blue,"/rest/files":file_blue}