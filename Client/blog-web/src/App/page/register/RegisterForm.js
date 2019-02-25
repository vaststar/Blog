import React,{ Component } from 'react'
import PropTypes from 'prop-types'

import {
    Form, Icon, Input, Button, Checkbox, Select, Tooltip
  } from 'antd';


const SUBMIT_FORM = 'submitForm';
const AGREEMENT_URL = 'agreementUrl';
class RegisterForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            this.props[SUBMIT_FORM](values);
          }
        });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
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
                    Nick Name&nbsp;
                    <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                    </Tooltip>
                </span>
                )}
            >
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Real Name"
            >
                {getFieldDecorator('realname', {
                    rules: [{ required: true, message: 'Please input your realname!', whitespace: true }],
                })(
                <Input />
            )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="ID Card"
            >
                {getFieldDecorator('idcard', {
                    rules: [{ required: true, message: 'Please input your social id number!' }],
                })(
                    <Input />
                )}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="Phone Number"
            >
                {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="E-mail"
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                    validateTrigger: 'onBlur'
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Password"
            >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: 'Please input your password!',
                    }],
                })(
                    <Input type="password" />
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Confirm Password"
            >
                {getFieldDecorator('confirm', {
                    rules: [{
                        required: true, message: 'Please confirm your password!',
                        }, {
                        validator: this.compareToFirstPassword,
                    }],
                    validateTrigger: 'onBlur'
                })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                    valuePropName: 'false',
                })(
                    <Checkbox>I have read the <a href={this.props[AGREEMENT_URL]}>agreement</a></Checkbox>
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
        </Form>
        );
    }
}

//类型检查，需要传入 submitForm agreementUrl
RegisterForm.propTypes={
    [SUBMIT_FORM]:PropTypes.func.isRequired,
    [AGREEMENT_URL]:PropTypes.string.isRequired
};

export default Form.create()(RegisterForm);