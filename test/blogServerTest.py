from urllib import request,parse
import json

class BlogTest(object):
    def register_user(self,username,password,realname='',idcard='',cellphone='',email=''):
        url = "http://127.0.0.1:4444/users/"
        header = {'Content-Type': 'application/json;charset=utf-8'}
        body = json.dumps({'username':username,'password':password,'realname':realname,
                           'idcard':idcard,'cellphone':cellphone,'email':email}).encode(encoding='utf-8')
        req = request.Request(url=url,data=body,headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def get_token(self,username,password):
        url = "http://127.0.0.1:4444/users/tokens/"
        header = {'Content-Type': 'application/json;charset=utf-8'}
        body = json.dumps({'username':username,'password':password}).encode(encoding='utf-8')
        req = request.Request(url=url,data=body,headers=header)
        res = request.urlopen(req).read()
        return json.loads(res.decode(encoding='utf-8')).get('data')

    def get_allAuthor(self,token):
        url = "http://127.0.0.1:4444/users/bases/"
        header = {'Content-Type': 'application/json;charset=utf-8','Authorization':'JWT '+ token}
        req = request.Request(url=url,headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def get_self(self,username,password):
        token = self.get_token(username,password)
        url = "http://127.0.0.1:4444/users/bases/{}/".format(username)
        header = {'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'JWT ' + token}
        req = request.Request(url=url, headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def post_Article(self,token,title,brief,text):
        url = "http://127.0.0.1:4444/articles/bases/"
        header = {'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'JWT ' + token}
        body = json.dumps({'title': title,'brief':brief,'body':text}).encode(encoding='utf-8')
        req = request.Request(url=url, data=body, headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def get_Article(self,articleid):
        url = "http://127.0.0.1:4444/articles/bases/"+articleid
        header = {'Content-Type': 'application/json;charset=utf-8'}
        req = request.Request(url=url,  headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))
        # resJson = json.loads(res)
        # text = self.get_file(resJson['data']['bodyurl'])
        # print(text,res.decode(encoding='utf-8'))

    def get_file(self,fileurl):
        url = "http://127.0.0.1:4444/files/"+fileurl
        header = {'Content-Type': 'application/json;charset=utf-8'}
        req = request.Request(url=url, headers=header)
        res = request.urlopen(req).read()
        return res.decode(encoding='utf-8')

    def post_comments(self,token,articleid,comments,refcommentid):
        url = "http://127.0.0.1:4444/articles/comments/"
        header = {'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'JWT ' + token}
        body = json.dumps({'articleid': articleid, 'comment': comments, 'refid': refcommentid}).encode(encoding='utf-8')
        req = request.Request(url=url, data=body, headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def get_comments(self,articleid):
        url = "http://127.0.0.1:4444/articles/comments/"+articleid
        header = {'Content-Type': 'application/json;charset=utf-8'}
        req = request.Request(url=url, headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))


if __name__=='__main__':
    test = BlogTest()
    # test.register_user('aaa','uu','zhu','341125','176','47@qq.com')
    # test.get_allAuthor(test.get_token('aaa','uu'))
    # test.get_self('aaa','uu')
    # test.post_Article(test.get_token('aaa','uu'),"文章标题","简介","文章内容")
    # test.get_Article("")
    # test.post_comments(test.get_token('aaa','uu'),"ea5602b834b711e98eda1831bfb80f05",'评论121','1a45e24a34b811e98fcc1831bfb80f05')
    test.get_comments("ea5602b834b711e98eda1831bfb80f05")