import random,os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from app.ServerConfig import config

class ValidCode(object):
    @staticmethod
    def getBase64Code():
        import io,base64
        mstream = io.BytesIO()
        validate_code = ValidCode.create_validate_code()
        img = validate_code[0]
        img.save(mstream, "JPEG")
        return base64.b64encode(mstream.getvalue()),validate_code[1]

    @staticmethod
    def create_validate_code(size=(120, 30),
                         mode="RGB",
                         bg_color=(255, 255, 255),
                         fg_color=(0, 0, 255),
                         font_size=18,
                         font_type=os.path.join(os.path.dirname(os.path.realpath(__file__)),"font.otf"),
                         length=4,
                         draw_lines=True,
                         n_lines=(1,3),
                         draw_points=True,
                         point_chance = 2):

        '''
        生成验证码图片
        @param size: 图片的大小，格式（宽，高），默认为(120, 30)
        @param mode: 图片模式，默认为RGB
        @param bg_color: 背景颜色，默认为白色
        @param fg_color: 前景色，验证码字符颜色，默认为蓝色#0000FF
        @param font_size: 验证码字体大小
        @param font_type: 验证码字体
        @param length: 验证码字符个数
        @param draw_lines: 是否划干扰线
        @param n_lines: 干扰线的条数范围，格式元组，默认为(1, 3)，只有draw_lines为True时有效
        @param draw_points: 是否画干扰点
        @param point_chance: 干扰点出现的概率，大小范围[0, 100]
        @return: [0]: PIL Image实例
        @return: [1]: 验证码图片中的字符串
        '''

        def initStr():
            '''生成初始字符串集合'''
            _letter_cases = "abcdefghjkmnpqrstuvwxy"  # 小写字母，去除可能干扰的i，l，o，z
            _upper_cases = _letter_cases.upper()  # 大写字母
            _numbers = ''.join(map(str, range(3, 10)))  # 数字
            return _letter_cases + _upper_cases + _numbers

        chars = initStr()#初始字符串集合
        width, height = size  # 宽， 高
        img = Image.new(mode, size, bg_color)  # 创建图形
        draw = ImageDraw.Draw(img)  # 创建画笔

        def get_chars():
            '''生成给定长度的字符串，返回列表格式'''
            return random.sample(chars, length)

        def create_lines():
            '''绘制干扰线'''
            line_num = random.randint(*n_lines)  # 干扰线条数
            for i in range(line_num):
                # 起始点
                begin = (random.randint(0, size[0]), random.randint(0, size[1]))
                # 结束点
                end = (random.randint(0, size[0]), random.randint(0, size[1]))
                draw.line([begin, end], fill=(0, 0, 0))

        def create_points():
            '''绘制干扰点'''
            chance = min(100, max(0, int(point_chance)))  # 大小限制在[0, 100]
            for w in range(width):
                for h in range(height):
                    tmp = random.randint(0, 100)
                    if tmp > 100 - chance:
                        draw.point((w, h), fill=(0, 0, 0))

        def create_strs():
            '''绘制验证码字符'''
            c_chars = get_chars()
            strs = ' '.join(c_chars)  # 字符前后以空格隔开
            font = ImageFont.truetype(font_type, font_size)
            font_width, font_height = font.getsize(strs)
            draw.text(((width - font_width) / 3, (height - font_height) / 3),
                        strs, font=font, fill=fg_color)
            return ''.join(c_chars)

        if draw_lines:
            create_lines()
        if draw_points:
            create_points()
        strs = create_strs()

        # 图形扭曲参数
        params = [1 - float(random.randint(1, 2)) / 100,
                  0,
                  0,
                  0,
                  1 - float(random.randint(1, 10)) / 100,
                  float(random.randint(1, 2)) / 500,
                  0.001,
                  float(random.randint(1, 2)) / 500
                  ]
        img = img.transform(size, Image.PERSPECTIVE, params)  # 创建扭曲

        img = img.filter(ImageFilter.EDGE_ENHANCE_MORE)  # 滤镜，边界加强（阈值更大）

        return img, strs

from app.ServerView.Common.emailOperate import EmailOperate
from app.ServerDB import blogDB
from app.ServerView.Common import Common
class ValidEmail(object):
    #发送验证码
    @staticmethod
    def send_valid_email(toaddr):
        code = ValidCode.create_validate_code()[1]
        if EmailOperate().sendEmail(config.SEND_EMAIL_CONF['user'],config.SEND_EMAIL_CONF['key'],[toaddr],
                                 "大学士阁密码重置","验证码为{}".format(code)):
            return code
        return None
    #写入修改邮箱的验证码
    @staticmethod
    def post_changePassword_email(email):
        code =  ValidEmail.send_valid_email(email)
        if code is not None:
            id = blogDB.addEmailValid(email,code)
            if id is not None:
                return Common.trueReturn(id,'ok')
            else:
                return Common.falseReturn(None,'add code error')
        else:
            return Common.falseReturn(None,'send email error')

    #验证邮箱验证码
    @staticmethod
    def check_changePassword_email(email,code):
        emailCode = blogDB.getEmailCode(email)
        if emailCode is None:
            return Common.falseReturn(None,'no code of {}'.format(email))
        elif emailCode[2]!=code:
            return Common.falseReturn(None, 'wrong code of {}'.format(email))
        else:
            return Common.trueReturn(emailCode[0],'ok')





# if __name__=='__main__':
#     print(ValidCode.getBase64Code())