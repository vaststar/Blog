from app.ServerView.viewUser import user_blue
from app.ServerView.viewArticle import article_blue
from app.ServerView.viewFileService import file_blue
from app.ServerView.viewComment import comment_blue
from app.ServerView.viewLikes import likes_blue
from app.ServerView.viewBrowser import browser_blue
from app.ServerView.viewIntroduce import introduce_blue

BLUEPRINT = {"/rest/users":user_blue,"/rest/articles":article_blue,"/rest/comments":comment_blue,
             "/rest/likes":likes_blue,"/rest/browsers":browser_blue,"/rest/introduces":introduce_blue,"/rest/files":file_blue}