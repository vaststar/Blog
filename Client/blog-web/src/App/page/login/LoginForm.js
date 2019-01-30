import React,{ Component } from 'react'

import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';

class LoginForm extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    render() {
      const { getFieldDecorator ,getFieldValue} = this.props.form;
      console.log('t',getFieldValue('userName'))
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue:getFieldValue('userName')
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue:getFieldValue('password')
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: getFieldValue('remember'),
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            {/* <a className="login-form-forgot" href="http://www.baidu.com">Forgot password</a> */}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            {/* Or <a href="http://www.baidu.com">register now!</a> */}
          </Form.Item>
        </Form>
      );
    }
}

const mapPropsToFields = (props)=>{
  console.log('fff',props)
  return {
    'userName':Form.createFormField({value:props.userName}),
    'password':Form.createFormField({value:props.passWord}),
    'remember':Form.createFormField({value:props.remember==='true'})
  };
};

// const onFieldsChange = (props, fields)=>{
//   console.log('ccc',props,fields)
//     fields.password = props.form.passWord;
//     fields.username = props.form.userName;
//     fields.remember = props.form.remember;
// };

const BlogLoginForm = Form.create({mapPropsToFields:mapPropsToFields})(LoginForm);
export default BlogLoginForm

   