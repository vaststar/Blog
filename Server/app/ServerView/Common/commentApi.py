import datetime
from app.ServerDB import blogDB
from app.ServerView.Common import Common

class CommentApi(object):
    @staticmethod
    def postComment(articleid, userid, comments, refid):
        commentid = blogDB.addComment(articleid, userid, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                                      comments, refid)
        if commentid is not None:
            return Common.trueReturn({"commentid": commentid}, 'add comment ok')
        return Common.falseReturn(None, 'add comment false')

    @staticmethod
    def deleteComment(commentid):
        if blogDB.delComment(commentid):
            return Common.trueReturn({"commentid": commentid}, 'delete comment ok')
        return Common.falseReturn(None, 'delete comment false')

    @staticmethod
    def getCommentByArticleId(artid):
        comments = blogDB.getCommentByArticleId(artid)
        if comments is not None:
            result = []
            if len(comments)==0:
                return Common.falseReturn(result,'no comment')
            for k, v in enumerate(comments):
                comment = dict(zip(("commentid", "articleid", "userid", "uptime", "comments", "refid"), v))
                result.append(comment)
            return Common.trueReturn(result, 'query ok')
        return Common.falseReturn(None, 'not found')

    @staticmethod
    def getCommentCountByArticleId(artid):
        res = blogDB.getCommentNumberByArticleId(artid)
        if res is not None:
            if len(res) == 0:
                return Common.trueReturn(0,'query ok')
            else:
                return Common.trueReturn(res[0], 'query ok')
        return Common.falseReturn(None, 'query false')

    @staticmethod
    def getChildCommentCountByCommentId(commentid):
        res = blogDB.getChildNumberByCommentId(commentid)
        if res is not None:
            if len(res) == 0:
                return Common.trueReturn(0,'query ok')
            else:
                return Common.trueReturn(res[0], 'query ok')
        return Common.falseReturn(None, 'query false')