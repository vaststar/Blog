from Server.ServerDB import blogDB
from Server.ServerView.Common import Common

class ArticleApi(object):
    '''定义一些用户相关的接口，给视图调用，减少视图工作量'''
    @staticmethod
    def postArticle(userid,title,brief,uptime,bodyurl):
        artid = blogDB.addArticle(userid,title,brief,uptime,bodyurl)
        if not artid is None:
            return Common.trueReturn({"articleid":artid},'add article ok')
        return Common.falseReturn(None,'add article false')

    @staticmethod
    def postComment(articleid,userid,uptime,comments,refid):
        commentid = blogDB.addComment(articleid,userid,uptime,comments,refid)
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
        result = []
        for k, v in enumerate(blogDB.getCommentByArticleId(artid)):
            result.append(dict(zip(("commentid","articleid","userid","uptime","comments","refid"), v)))
        return Common.trueReturn(result, 'query ok')
