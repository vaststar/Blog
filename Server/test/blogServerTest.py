from urllib import request,parse
import json

class BlogTest(object):
    def register_user(self,username,password,realname='',idcard='',cellphone='',email='',avatarurl=''):
        url = "http://127.0.0.1:4444/rest/users/"
        header = {'Content-Type': 'application/json;charset=utf-8'}
        body = json.dumps({'username':username,'password':password,'realname':realname,
                           'idcard':idcard,'cellphone':cellphone,'email':email,'avatarurl':avatarurl}).encode(encoding='utf-8')
        req = request.Request(url=url,data=body,headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def get_token(self,username,password):
        url = "http://127.0.0.1:4444/rest/users/tokens/"
        header = {'Content-Type': 'application/json;charset=utf-8'}
        body = json.dumps({'username':username,'password':password}).encode(encoding='utf-8')
        req = request.Request(url=url,data=body,headers=header)
        res = request.urlopen(req).read()
        return json.loads(res.decode(encoding='utf-8')).get('data')

    def get_allAuthor(self,token):
        url = "http://127.0.0.1:4444/rest/users/bases/"
        header = {'Content-Type': 'application/json;charset=utf-8','Authorization':'JWT '+ token}
        req = request.Request(url=url,headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def get_self(self,username,password):
        token = self.get_token(username,password)
        url = "http://127.0.0.1:4444/rest/users/bases/{}/".format(username)
        header = {'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'JWT ' + token}
        req = request.Request(url=url, headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def post_Article(self,token,title,brief,keywords,coverurl,text):
        url = "http://127.0.0.1:4444/rest/articles/bases/"
        header = {'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'JWT ' + token}
        body = json.dumps({'title': title,'brief':brief,'keywords':keywords,'coverurl':coverurl,'body':text}).encode(encoding='utf-8')
        req = request.Request(url=url, data=body, headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def get_Article(self,articleid):
        url = "http://127.0.0.1:4444/rest/articles/bases/"+articleid
        header = {'Content-Type': 'application/json;charset=utf-8'}
        req = request.Request(url=url,  headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))
        # resJson = json.loads(res)
        # text = self.get_file(resJson['data']['bodyurl'])
        # print(text,res.decode(encoding='utf-8'))

    def get_file(self,fileurl):
        url = "http://127.0.0.1:4444/rest/files/"+fileurl
        header = {'Content-Type': 'application/json;charset=utf-8'}
        req = request.Request(url=url, headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def post_comments(self,token,articleid,comments,refcommentid):
        url = "http://127.0.0.1:4444/rest/articles/comments/"
        header = {'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'JWT ' + token}
        body = json.dumps({'articleid': articleid, 'comment': comments, 'refid': refcommentid}).encode(encoding='utf-8')
        req = request.Request(url=url, data=body, headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))

    def get_comments(self,articleid):
        url = "http://127.0.0.1:4444/rest/articles/comments/"+articleid
        header = {'Content-Type': 'application/json;charset=utf-8'}
        req = request.Request(url=url, headers=header)
        res = request.urlopen(req).read()
        print(res.decode(encoding='utf-8'))


if __name__=='__main__':
    test = BlogTest()
    # test.register_user('aaa','uu','zhu','341125','176','47@qq.com')
    # test.get_allAuthor(test.get_token('aaa','uu'))
    # test.get_self('aaa','uu')
    # test.post_Article(test.get_token('aaa','uu'),"Kotlin指针指南","没什么讲的","key","coverurl","<p><span style='color: rgb(255, 0, 0);'><em><strong>1111</strong></em><em><strong><img src='http://localhost:4444/files/1.png' title='1.png' alt='1.png'/></strong></em></span></p>")
    # test.get_Article("")
    # test.post_comments(test.get_token('aaa','uu'),"3a2ee930359d11e993291831bfb80f05",'讲得好','')
    # test.get_comments("ea5602b834b711e98eda1831bfb80f05")
    # test.get_file("2019/02/21/2019_02_21_13_55_01_C")
    import pymysql,os

    os.system("mysql - h192.168.0.135 - P3306 - uroot - p123456 - e 'CREATE DATABASE IF NOT EXISTS blog'")