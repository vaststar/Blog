from Server.ServerDB import blogDB
from Server.ServerView.Common import Common

class ArticleApi(object):
    '''定义一些用户相关的接口，给视图调用，减少视图工作量'''
    @staticmethod
    def getAllArticle():
        result = []
        for k, v in enumerate(blogDB.getAllArticle()):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')