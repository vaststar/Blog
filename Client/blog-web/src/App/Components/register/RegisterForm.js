import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {
    Form, Icon, Input, Button, Checkbox, Select, Tooltip, Modal
  } from 'antd';

import {postFile,post,get} from '../../Common/RequestREST'

const SUBMIT_FORM = 'submitForm';
const AGREEMENT_URL = 'agreementUrl';
class RegisterForm extends Component {
    state={previewVisible: false,avatarrurl:null,validcode:{},startCount:false,seconds:60}

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            this.refreshValidCode();
            this.props[SUBMIT_FORM](values);
          }
        });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次密码不一致!');
        } else {
          callback();
        }
    }
    agreeChecked=(rule,value,callback)=>{
        if (!value ) {
          callback('请阅读并同意条款!');
        } else {
          callback();
        }
    }
    validCodeCorrect=(rule, value, callback)=>{
        if(value && value !== this.state.validcode.code){
            callback('验证码不正确!');
        }else{
            callback();
        }
    }

    render() { 
        const { getFieldDecorator} = this.props.form;

        const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Select.Option value="86">+86</Select.Option>
          <Select.Option value="87">+87</Select.Option>
        </Select>
      );
  
        return (
        <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item
                {...formItemLayout}
                label={(
                <span>
                    昵称&nbsp;
                    <Tooltip title="账户登陆名，不可修改">
                    <Icon type="question-circle-o" />
                    </Tooltip>
                </span>
                )}
            >
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: '请输入账户名称!', whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="真实姓名"
            >
                {getFieldDecorator('realname', {
                    rules: [{ required: true, message: '请输入真实姓名!', whitespace: true }],
                })(
                <Input />
            )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="身份证号"
            >
                {getFieldDecorator('idcard', {
                    rules: [{ required: true, message: '请输入身份证号!' }],
                })(
                    <Input />
                )}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="手机号"
            >
                {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入联系电话!' }],
                })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="邮箱"
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: '请输入联系邮箱!',
                    }],
                    validateTrigger: 'onBlur'
                })(
                    <Input addonAfter={<label onClick={this.getEmailCode} className="get_email_code_label" style={this.state.startCount?{"color":"red"}:null}>
                                        {this.state.startCount?this.state.seconds+"S":"获取验证码"}</label>}/>
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="邮箱验证码"
            >
                {getFieldDecorator('emailcode', {
                    rules: [{required: true, message: '请输入邮箱验证码!'}]
                })(
                <Input  placeholder="请输入验证码（大小写敏感）" allowClear/>
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="用户头像"
            >
                {getFieldDecorator('avatarurl', {
                  rules: [{ required: false, message: '请添加用户头像!' }],
                  normalize:this.normalAll
                })(
                <Input addonAfter={<Icon type="eye" onClick={this.viewAvatar}/>} 
                  onPaste={this.pasteAvatar} onDrop={this.dropAvatar}
                  placeholder="拖拽图片或者粘贴图片" allowClear readOnly/>
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="密码"
            >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: '请输入密码!',
                    }],
                })(
                    <Input type="password" />
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="确认密码"
            >
                {getFieldDecorator('confirm', {
                    rules: [{
                        required: true, message: '请确认密码!',
                        }, {
                        validator: this.compareToFirstPassword,
                    }],
                    validateTrigger: 'onBlur'
                })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="验证码"
            >
                {getFieldDecorator('validcode', {
                  rules: [{ required: true, message: '请输入正确的验证码（大小写敏感）!' },
                          {validator: this.validCodeCorrect}
                        ],
                  validateTrigger: 'onBlur'
                })(
                <Input addonAfter={<img src={this.state.validcode.base64} onClick={this.refreshValidCode} alt="None"/>} 
                  placeholder="请输入验证码（大小写敏感）" allowClear />
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                    rules: [{
                        required: true, message: '请阅读并勾选用户协议!',
                        },{
                        validator:this.agreeChecked,
                        }
                    ],
                    validateTrigger:"onChange",
                    valuePropName: 'checked',
                })(
                    <Checkbox>我已阅读 <a href={this.props[AGREEMENT_URL]}>用户协议</a></Checkbox>
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="regiserCom_regButton">注册</Button>
            </Form.Item>
            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={this.state.avatarurl} />
            </Modal>
        </Form>
        );
    }
    //监听item内容修改
    normalAll=(value, prevValue, allValues)=>{
        if(value && value!==prevValue)
        {
            this.setState({avatarurl:this.props.fileUrl+"/"+value.replace("\\","/")})
        }
        return value
    }
    //预览封面
    viewAvatar=()=>{this.setState({previewVisible: true});}
    //关闭预览封面
    handleCancel = () => this.setState({ previewVisible: false })
    //拖拽
    dropAvatar=(e)=> {
        if (!(e.dataTransfer && e.dataTransfer.files)) {
            alert("浏览器不支持拖拽上传")
            return
        }
        let dataList = e.dataTransfer.files
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].type.indexOf('image') === -1 ) {
                alert("仅可上传图片")
                continue
            }
            let formData = new FormData()
            formData.append('file', dataList[i])
            //拖拽之后，上传图片到服务器，返回结果写入编辑器
            this.postImage(formData,dataList[i].name)
        }
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }
    //粘贴封面
    pasteAvatar=(e)=>{
        if (!(e.clipboardData && e.clipboardData.items)) {
            alert("浏览器不支持粘贴上传")
        return
        }
        let dataList = e.clipboardData.items
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].kind === 'file' && dataList[i].getAsFile().type.indexOf('image') !== -1) {
                let formData = new FormData()
                formData.append('file', dataList[i].getAsFile())
                //粘贴之后，上传图片到服务器，返回结果写入编辑器
                this.postImage(formData,dataList[i].getAsFile().name)
            }
        }
    }
    //上传图片
    postImage=(formData,filename)=>{
        postFile(this.props.fileUrl+"/avatars/"+filename, formData
        ).then(result=>result.json()).then(result=>{
            this.props.form.setFieldsValue({avatarurl:result.data.filepath}) 
        }).catch(function(e){
            console.log(e)
        })
    }
    //加载控件，获取验证码
    componentDidMount(){
        this.refreshValidCode();
    }
    refreshValidCode=()=>{
        get(this.props.validcodeUrl+'/codes/').then(response=>response.json()).then(result=>{
            if(result.status){
                this.setState((prestate)=>({validcode:{'code':result.data.code,'base64':'data:image/png;base64,'+result.data.base64}}))
            }
        }).catch(function (e) {
            console.log( e);
        });
    }
    //获取邮箱验证码
    getEmailCode=()=>{
        if(!this.state.startCount)
        {
            this.startCountTime()
            post(this.props.validcodeUrl+'/emails/registers/',{'email':this.props.form.getFieldValue('email')}).then(response=>response.json()).then(result=>{
            }).catch(function (e) {
                console.log( e);
            });
        }
    }
    //开始邮箱按钮计时
    startCountTime=()=>{
        this.timer = setInterval(() => {
            this.setState((preState) =>({
              seconds: preState.seconds - 1,
              startCount:true
            }),() => {
              if(this.state.seconds === 0){
                clearInterval(this.timer);
                this.setState({startCount:false,seconds:60})
                
              }
            });
        }, 1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
}

//类型检查，需要传入 submitForm agreementUrl
RegisterForm.propTypes={
    [SUBMIT_FORM]:PropTypes.func.isRequired,
    [AGREEMENT_URL]:PropTypes.string.isRequired
};

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
  }
export default connect(mapStateToProps)(Form.create()(RegisterForm));