import datetime
from app.ServerDB import blogDB
from app.ServerView.Common import Common

class ArticleApi(object):
    '''定义一些用户相关的接口，给视图调用，减少视图工作量'''
    @staticmethod
    def getAllArticle():
        result = []
        for k, v in enumerate(blogDB.getAllArticle()):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticlePagnation(pageNumber=1,pagesize=1):
        result=[]
        for k,v in enumerate(blogDB.getArticleLimit(pagesize,(pageNumber-1)*pagesize)):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticleBaseByID(artid):
        blogbase =blogDB.getArticleById(artid)
        if not blogbase is None:
            result = dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), blogbase))
            return Common.trueReturn(result,'query ok')
        return Common.falseReturn(None,'not found')

    @staticmethod
    def postArticle(userid,title,brief,keys,coverurl,bodyurl):
        artid = blogDB.addArticle(userid,title,brief,keys,coverurl,datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),bodyurl)
        if not artid is None:
            return Common.trueReturn({"articleid":artid},'add article ok')
        return Common.falseReturn(None,'add article false')

    @staticmethod
    def updateArticle(articleid,title,brief,keys,coverurl):
        if blogDB.updateArticle(articleid,title,brief,keys,coverurl):
            return Common.trueReturn({"articleid":articleid},'change ok')
        return Common.falseReturn(None,'change false')

    @staticmethod
    def deleteArticle(articleid):
        if blogDB.delArticle(articleid):
            return Common.trueReturn({"articleid": articleid}, 'delete ok')
        return Common.falseReturn(None, 'delte false')

    @staticmethod
    def postComment(articleid,userid,comments,refid):
        commentid = blogDB.addComment(articleid,userid,datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),comments,refid)
        if not commentid is None:
            return Common.trueReturn({"commentid":commentid},'add comment ok')
        return Common.falseReturn(None,'add comment false')

    @staticmethod
    def deleteComment(commentid):
        if blogDB.delComment(commentid):
            return Common.trueReturn({"commentid":commentid},'delete comment ok')
        return Common.falseReturn(None,'delete comment false')

    @staticmethod
    def getCommentByArticleId(artid):
        comments = blogDB.getCommentByArticleId(artid)
        if not comments is None:
            result = []
            for k, v in enumerate(comments):
                comment = dict(zip(("commentid","articleid","userid","uptime","comments","refid"), v))
                result.append(comment)
            return Common.trueReturn(result, 'query ok')
        return Common.falseReturn(None,'not found')

    @staticmethod
    def getCommentCountByArticleId(artid):
        res = blogDB.getCommentNumberByArticleId(artid)
        if res:
            return Common.trueReturn(res[0],'query ok')
        return Common.falseReturn(None,'query false')

    @staticmethod
    def getChildCommentCountByCommentId(commentid):
        res = blogDB.getChildNumberByCommentId(commentid)
        if res:
            return Common.trueReturn(res[0], 'query ok')
        return Common.falseReturn(None, 'query false')

    @staticmethod
    def getAllArticleCount():
        res = blogDB.getArticleCount()
        if res:
            return Common.trueReturn(res[0],'query ok')
        return Common.falseReturn(None,'query false')
    @staticmethod
    def getArticleCountByUserId(userid):
        res = blogDB.getArticleCountByUserid(userid)
        if res:
            return Common.trueReturn(res[0],'query ok')
        return Common.falseReturn(None,'query false')