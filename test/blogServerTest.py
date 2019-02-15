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
        url = "http://127.0.0.1:4444/articles/"
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
        resJson = json.loads(res)
        text = self.get_file(resJson['data']['bodyurl'])
        print(text,res.decode(encoding='utf-8'))

    def get_file(self,fileurl):
        url = "http://127.0.0.1:4444/files/"+fileurl
        header = {'Content-Type': 'application/json;charset=utf-8'}
        req = request.Request(url=url, headers=header)
        res = request.urlopen(req).read()
        return res.decode(encoding='utf-8')


if __name__=='__main__':
    test = BlogTest()
    # test.register_user('tttt','uu','zhu','341125','176','47@qq.com')
    # test.get_allAuthor(test.get_token('ttt','uu'))
    # test.get_self('ttt','uu')
    # test.post_Article(test.get_token('tttt','uu'),"titi","bribri","contecont")
    test.get_Article("83204fb4310111e994281831bfb80f05")