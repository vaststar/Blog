import smtplib,os
from email.header import Header
from email.utils import parseaddr, formataddr
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

class EmailOperate(object):
    def __init__(self):
        self.EMAIL_SERVER={"QQ":{"SMTP":["smtp.qq.com",465,True],"POP3":["pop.qq.com",995,True],"IMAP":["imap.qq.com",993,True]},
                          "GMAIL":{"SMTP":["smtp.gmail.com",465,True],"POP3":["pop.gmail.com",995,True],"IMAP":["imap.gmail.com",993,True]},
                          "FOXMAIL":{"SMTP":["SMTP.foxmail.com",465,True],"POP3":["POP3.foxmail.com",995,True],"IMAP":["imap.foxmail.com",993,True]},
                          "SINA":{"SMTP":["smtp.sina.com.cn",465,True],"POP3":["pop3.sina.com.cn",995,True],"IMAP":["imap.sina.com",993,True]},
                          "163":{"SMTP":["smtp.163.com",465,True],"POP3":["pop.163.com",995,True],"IMAP":["imap.163.com",993,True]},
                          "HOTMAIL":{"SMTP":["smtp.live.com",25,False],"POP3":["pop.live.com",995,True],"IMAP":["imap.live.com",993,True]},
                          "OUTLOOK":{"SMTP":["smtp-mail.outlook.com",25,False],"POP3":["pop-mail.outlook.com",995,True],"IMAP":["imap-mail.outlook.com",993,True]},
                          "AOL":{"SMTP":["smtp.aol.com",25,False],"POP3":["pop.aol.com",110,False],"IMAP":["imap.aol.com",993,True]},
                          }

    @staticmethod
    def format_header_addr(s):
        '''
        :param s: [简称 <邮箱地址>] or 简称 <邮箱地址>
        :return: Header
        '''
        if isinstance(s,str):
            emname, emaddr = parseaddr(s)
            return formataddr((Header(emname, 'utf-8').encode(), emaddr))
        elif isinstance(s,list):
            res=[]
            for li in s:
                emname, emaddr = parseaddr(li)
                res.append(formataddr((Header(emname, 'utf-8').encode(), emaddr)))
            return ",".join(res)

    @staticmethod
    def get_email_addr(s):
        '''
        :param s: [简称 <邮箱地址>]
        :return: addr列表
        '''
        if isinstance(s,str):
            emname, emaddr = parseaddr(s)
            return emaddr
        elif isinstance(s,list):
            res=[]
            for li in s:
                emname, emaddr = parseaddr(li)
                res.append(emaddr)
            return res
    @staticmethod
    def get_email_type(s):
        '''
        :param s: [简称 <邮箱地址>]
        :return: 邮件类型列表 eg: QQ
        '''
        if isinstance(s,str):
            emname, emaddr = parseaddr(s)
            return emaddr.split('@')[-1].split('.')[0].upper()
        elif isinstance(s,list):
            res=[]
            for li in s:
                emname, emaddr = parseaddr(li)
                res.append(emaddr.split('@')[-1].split('.')[0].upper())
            return res


    def sendEmail(self,from_addr,key,to_addr,title,content,files=None):
        '''
        :param serverType:邮件服务类型，定义在类中 eg:QQ
        :param key: 邮件授权码 eg:"key":rvueixdphgjdbjeb
        :param from_addr: 发送者地址 eg: "我是发送者 <47029316@qq.com>"
        :param to_addr: 接受者地址列表 eg: ["接受者1 <445789@qq.com>","接受者2 <8888@qq.com>"]
        :param title: 邮件标题 eg: "我是标题"
        :param content: 邮件正文 eg："邮件正文"
        :param files: 邮件附件 eg: ["附件地址"]
        :return:
        '''
        message = MIMEMultipart()
        message['From'] = EmailOperate.format_header_addr(from_addr)#发送地址
        message['To'] = EmailOperate.format_header_addr(to_addr)#接收地址
        message['Subject'] = Header(title, 'utf-8')#标题
        message.attach(MIMEText(content, 'plain', 'utf-8'))#正文
        if files is not None:#附件
            for file in files:
                with open(file,'rb') as f:
                    # 设置MIMEBase对象包装附件
                    attachment = MIMEBase('application', 'octet-stream')
                    # 添加附件
                    attachment.set_payload(f.read())
                    # 添加附件标题
                    attachment.add_header('Content-Disposition', 'attachment', filename=os.path.basename(file))
                    # 编码附件
                    encoders.encode_base64(attachment)
                    # 添加附件到邮件中
                    message.attach(attachment)
        try:
            server = self.EMAIL_SERVER.get(EmailOperate.get_email_type(from_addr)).get("SMTP")
            if server[2]:
                smtpObj = smtplib.SMTP_SSL(server[0], server[1])
            else:
                smtpObj = smtplib.SMTP(server[0],server[1])
                smtpObj.starttls()

            smtpObj.set_debuglevel(1)
            smtpObj.login(EmailOperate.get_email_addr(from_addr), key)
            # 发送邮件
            smtpObj.sendmail(from_addr=EmailOperate.get_email_addr(from_addr), to_addrs=EmailOperate.get_email_addr(to_addr), msg=message.as_string())
            # 发送完成
            smtpObj.quit()
            return True
        except smtplib.SMTPException as e:
            print(e)
            return False

if __name__ == '__main__':
    print(EmailOperate().sendEmail("昵称 <YehrftfrAflcvjtj@hotmail.com>",'aQLKD1PsqxK0',["接受者1 <tomcruise_six@datingwithlili.com>"],
                             "标题","内容"))

    '''
    GnkuirBpdwhud@outlook.com	bY7HX9Y9Qkii
	   
 	
JamarcusBarkerMT@aol.com	W6CfVP9c
SusanMaynardr@aol.com	OT071NO2
RolandoSmithS@aol.com	BtFr09X1
MaxRudolfzR@yahoo.com	v7nn21yAa
ElmerAshburbBr@yahoo.com	k2J3cw1VI
ChristWendelliNc@yahoo.com	rXxINc69l
LyndonAlgernongA@yahoo.com	jzf13eXB0
LenMarthaxHw@yahoo.com	p8i0X1Ol7
	
NuwdmbmEwobzbc@hotmail.com	tUAbFDxE0NUl
YehrftfrAflcvjtj@hotmail.com	aQLKD1PsqxK0
XnovlPrkinu@hotmail.com	jl3UxUH5k9L8
JmhwqlqRfcrjgv@hotmail.com	9IEh391J4DU2
    '''