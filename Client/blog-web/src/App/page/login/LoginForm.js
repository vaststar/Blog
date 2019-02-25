import React,{ Component } from 'react'
import PropTypes from 'prop-types'

import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';


const USER_NAME = 'userName';
const PASSWORD = 'password';
const REMEMBER = 'remember';
const SUBMIT_FORM = 'submitForm';
const FORGOT_URL = 'forgetUrl';
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
  
    render() {
      const { getFieldDecorator ,getFieldValue} = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator(USER_NAME, {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue:getFieldValue(USER_NAME)
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(PASSWORD, {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue:getFieldValue(PASSWORD)
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(REMEMBER, {
              valuePropName: 'checked',
              initialValue: getFieldValue(REMEMBER)
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href={this.props[FORGOT_URL]}>Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href={this.props[REGISTER_URL]}>register now!</a>
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
  [FORGOT_URL]:PropTypes.string.isRequired,
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
  //  console.log('ccc',props,fields)
};

export default Form.create({mapPropsToFields:mapPropsToFields,onFieldsChange:onFieldsChange})(LoginForm);

   