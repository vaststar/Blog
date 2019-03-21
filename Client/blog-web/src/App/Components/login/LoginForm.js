import React,{ Component } from 'react'
import PropTypes from 'prop-types'

import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';


const USER_NAME = 'userName';
const PASSWORD = 'password';
const REMEMBER = 'remember';
const SUBMIT_FORM = 'submitForm';
const FORGOT_FUNC = 'forgetClick';
const REGISTER_URL = 'registerUrl';

class LoginForm extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          this.props[SUBMIT_FORM](values);
        }
      });
    }
  
    getUserName=()=>{
      return this.props.form.getFieldValue(USER_NAME)
    }
    render() {
      const { getFieldDecorator ,getFieldValue} = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator(USER_NAME, {
              rules: [{ required: true, message: '请输入用户名!' }],
              initialValue:getFieldValue(USER_NAME)
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(PASSWORD, {
              rules: [{ required: true, message: '请输入密码!' }],
              initialValue:getFieldValue(PASSWORD)
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(REMEMBER, {
              valuePropName: 'checked',
              initialValue: getFieldValue(REMEMBER)
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            <div className="login-form-forgot"  onClick={this.props[FORGOT_FUNC]}>忘记密码</div>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
            <a href={this.props[REGISTER_URL]}>注册!</a>
          </Form.Item>
        </Form>
      );
    }
}

//类型检查，需要传入 userName,password,remember以及回调函数
LoginForm.propTypes={
  [USER_NAME]:PropTypes.string.isRequired,
  [PASSWORD]:PropTypes.string.isRequired,
  [REMEMBER]:PropTypes.bool.isRequired,
  [SUBMIT_FORM]:PropTypes.func.isRequired,
  [FORGOT_FUNC]:PropTypes.func.isRequired,
  [REGISTER_URL]:PropTypes.string.isRequired
};

const mapPropsToFields = (props)=>{
  return {
    [USER_NAME]:Form.createFormField({value:props[USER_NAME]}),
    [PASSWORD]:Form.createFormField({value:props[PASSWORD]}),
    [REMEMBER]:Form.createFormField({value:props[REMEMBER]})
  };
};

const onFieldsChange = (props, fields)=>{
  // console.log(props.form,fields)
};


export default Form.create({mapPropsToFields:mapPropsToFields,onFieldsChange:onFieldsChange})(LoginForm);

   