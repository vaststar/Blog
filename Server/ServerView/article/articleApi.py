import datetime
from Server.ServerDB import blogDB
from Server.ServerView.Common import Common

class ArticleApi(object):
    '''定义一些用户相关的接口，给视图调用，减少视图工作量'''
    @staticmethod
    def postArticle(userid,title,brief,bodyurl):
        artid = blogDB.addArticle(userid,title,brief,datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),bodyurl)
        if not artid is None:
            return Common.trueReturn({"articleid":artid},'add article ok')
        return Common.falseReturn(None,'add article false')

    @staticmethod
    def postComment(articleid,userid,comments,refid):
        commentid = blogDB.addComment(articleid,userid,datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),comments,refid)
        if not commentid is None:
            return Common.trueReturn({"commentid":commentid},'add comment ok')
        return Common.falseReturn(None,'add comment false')

    @staticmethod
    def getAllArticle():
        result = []
        for k, v in enumerate(blogDB.getAllArticle()):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getCommentByArticleId(artid):
        comments = blogDB.getCommentByArticleId(artid)
        print('getcccc',artid,comments)
        if not comments is None:
            result = []
            for k, v in enumerate(comments):
                result.append(dict(zip(("commentid","articleid","userid","uptime","comments","refid"), v)))
            return Common.trueReturn(result, 'query ok')
        return Common.falseReturn(None,'not found')

    @staticmethod
    def getArticleBaseByID(artid):
        blogbase =blogDB.getArticleById(artid)
        if not blogbase is None:
            result = dict(zip(("articleid", "userid", "title", "breif", "uptime", "bodyurl"), blogbase))
            return Common.trueReturn(result,'query ok')
        return Common.falseReturn(None,'not found')
