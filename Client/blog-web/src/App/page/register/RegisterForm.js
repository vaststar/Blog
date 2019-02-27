import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {
    Form, Icon, Input, Button, Checkbox, Select, Tooltip, Modal
  } from 'antd';

import {postFile,post} from '../../Common/RequestREST'

const SUBMIT_FORM = 'submitForm';
const AGREEMENT_URL = 'agreementUrl';
class RegisterForm extends Component {
    state={previewVisible: false,avatarrurl:null}

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
    agreeChecked=(rule,value,callback)=>{
        if (!value ) {
          callback('Please agree!');
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
                label="Avatar"
            >
                {getFieldDecorator('avatarurl', {
                  rules: [{ required: false, message: 'Please paste or drag cover image!' }],
                  normalize:this.normalAll
                })(
                <Input addonAfter={<Icon type="eye" onClick={this.viewAvatar}/>} 
                  onPaste={this.pasteAvatar} onDrop={this.dropAvatar}
                  placeholder="拖拽图片或者粘贴图片" allowClear readOnly/>
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
                    rules: [{
                        required: true, message: 'Please check agreement!',
                        },{
                        validator:this.agreeChecked,
                        }
                    ],
                    validateTrigger:"onChange",
                    valuePropName: 'checked',
                })(
                    <Checkbox>I have read the <a href={this.props[AGREEMENT_URL]}>agreement</a></Checkbox>
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
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
        postFile(this.props.fileUrl+"/"+filename, formData
        ).then(result=>result.json()).then(result=>{
            this.props.form.setFieldsValue({avatarurl:result.data.filepath}) 
        }).catch(function(e){
            console.log(e)
        })
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