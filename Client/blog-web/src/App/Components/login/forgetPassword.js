import React,{ Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
    Form, Icon, Input, Button, Checkbox,message
  } from 'antd';
import {post, get} from '../../Common/RequestREST'

const USER_ID = "userid";
const RESET_OK_FUNC="okFunc"
class ForgetPassword extends Component {
    state={validcode:{},startCount:false,seconds:60}
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            post(this.props.userUrl+'/resets/passwords/',
            {'userid':this.props[USER_ID],'emailcode':this.props.form.getFieldValue('emailcode'),'password':this.props.form.getFieldValue('password')}).then(response=>response.json()).then(result=>{
                if(result.status){
                    this.props[RESET_OK_FUNC]()
                    let a = this.props.form.getFieldValue('email')
                    this.props.form.resetFields()
                    this.props.form.setFieldsValue({'email':a})
                }else{
                    message.error("密码重置失败，请联系管理员")
                    this.refreshValidCode();
                }
            })
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
    validCodeCorrect=(rule, value, callback)=>{
        if(value && value !== this.state.validcode.code){
            callback('验证码不正确!');
        }else{
            callback();
        }
    }
    render(){
        const { getFieldDecorator ,getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
            },
          };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 20,
              offset: 4,
            },
          },
        };

        return(
            <Form onSubmit={this.handleSubmit} >
            <Form.Item
                {...formItemLayout}
                label="邮箱"
            >
                {getFieldDecorator('email', {
                })(
                    <Input readOnly addonAfter={<label onClick={this.getEmailCode} className="get_email_code_label" style={this.state.startCount?{"color":"red"}:null}>
                                        {this.state.startCount?this.state.seconds+"S":"获取验证码"}</label>}/>
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="验证码"
            >
                {getFieldDecorator('emailcode', {
                    rules: [{required: true, message: '请输入邮箱验证码!'}]
                })(
                <Input  placeholder="请输入验证码（大小写敏感）" allowClear/>
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
                <Button type="primary" htmlType="submit" className="forgetCom_resetButton">修改</Button>
            </Form.Item>
            </Form>
        )
    }
    componentDidMount(){
        //查询并显示邮箱
        this.getUserEmail()
        this.refreshValidCode()
    }
    getUserEmail=()=>{
        get(this.props.userUrl+"/emails/"+this.props[USER_ID]).then(response=>response.json()).then(result=>{
            if(result.status){
                let a = result.data.substr(0,2)+'***'+result.data.substr(6,result.data.split('').length);
                this.props.form.setFieldsValue({'email':a})
            }else{
                message.error("未获取到用户邮箱")
            }
        })
    }
    refreshValidCode=()=>{
        get(this.props.validcodeUrl+'/codes/').then(response=>response.json()).then(result=>{
            if(result.status){
                let state=this.state;
                state.validcode={'code':result.data.code,'base64':'data:image/png;base64,'+result.data.base64};
                this.setState(state)
            }else{
                message.error("验证码刷新失败")
            }
        })
    }
    //获取邮箱验证码
    getEmailCode=()=>{
        if(!this.state.startCount)
        {
            this.startCountTime()
            post(this.props.validcodeUrl+'/emails/passwords/',{'userid':this.props[USER_ID]}).then(response=>response.json()).then(result=>{
                if(!result.status){
                    message.error("发送验证码错误，请检查网络，或联系管理员")
                }
            })
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

ForgetPassword.propTypes={
    [USER_ID]:PropTypes.string.isRequired
};

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(Form.create()(ForgetPassword))