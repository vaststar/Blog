from app.ServerDB import blogDB
from app.ServerView.Common import Common

class LikesApi(object):
    @staticmethod
    def postLikesArticle(articleid,userid):
        if LikesApi.getIsSelfLikesArticle(articleid,userid).get('status'):
            return Common.falseReturn(None, 'already liked')
        if blogDB.addLikesArticle(articleid,userid):
            return Common.trueReturn(True,'like ok')
        return Common.falseReturn(None,'like false')

    @staticmethod
    def delLikesArticle(articleid,userid):
        if blogDB.delLikesArticle(articleid,userid):
            return Common.trueReturn(True,'del ok')
        return Common.falseReturn(None,'del false')

    @staticmethod
    def getLikesArticleNumber(articleid):
        res = blogDB.getLikesNumberByArticleId(articleid)
        if res is not None:
            if len(res) == 0:
                return Common.trueReturn(0,'query ok')
            else:
                return Common.trueReturn(res[0], 'query ok')
        return Common.falseReturn(None, 'query false')

    @staticmethod
    def postLikesComment(commentid,userid):
        if LikesApi.getIsSelfLikesComment(commentid,userid).get('status'):
            return Common.falseReturn(None, 'already liked')
        if blogDB.addLikesComment(commentid,userid):
            return Common.trueReturn(True,'like ok')
        return Common.falseReturn(None,'like false')

    @staticmethod
    def delLikesComment(commentid, userid):
        if blogDB.delLikesComment(commentid, userid):
            return Common.trueReturn(True, 'del ok')
        return Common.falseReturn(None, 'del false')

    @staticmethod
    def getLikesCommentNumber(commentid):
        res = blogDB.getLikesNumberByCommentId(commentid)
        if not res is None:
            if len(res) == 0:
                return Common.trueReturn(0,'query ok')
            else:
                return Common.trueReturn(res[0], 'query ok')
        return Common.falseReturn(None, 'query false')

    @staticmethod
    def getIsSelfLikesArticle(userid,articleid):
        res = blogDB.getLikesArticleByUser(userid)
        if res is not None:
            if len(res) == 0:
                return Common.trueReturn(False,'not like it')
            for k,v in enumerate(res):
                if articleid == v[1]:
                    return Common.trueReturn(True,'like it')
            return Common.trueReturn(False,'not like it')
        else:
            return Common.falseReturn(None,'no')

    @staticmethod
    def getIsSelfLikesComment(userid,commentid):
        res = blogDB.getLikesCommentByUser(userid)
        if res is not None:
            if len(res) == 0:
                return Common.trueReturn(False,'not like it')
            for k,v in enumerate(res):
                if commentid == v[1]:
                    return Common.trueReturn(True,'like it')
            return Common.trueReturn(False,'not like it')
        else:
            return Common.falseReturn(None,'no')