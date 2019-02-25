import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {
    Form, Icon, Input, Button
  } from 'antd';


import Header from '../../Common/Header'
import MarkDownEditor from './markDownEditor'
import {postFile} from '../../Common/RequestREST'

const ARTICLE_TITLE='articleTitle'
const ARTICLE_CONTENT='articleContent'
const ARTICLE_BRIEF='articleBrief'
const ARTICLE_KEYWORDS='articleKeys'
const ARTICLE_COVER='articleCover'

class WriteArticleComponent extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    render() {
        const { getFieldDecorator ,getFieldValue} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="article-write-form">
                <Form.Item>
                    {getFieldDecorator(ARTICLE_TITLE, {
                      rules: [{ required: true, message: 'Please input article title!' }],
                      initialValue:getFieldValue(ARTICLE_TITLE)
                    })(
                        <Input addonBefore="标题" placeholder="Title" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(ARTICLE_BRIEF, {
                      rules: [{ required: true, message: 'Please input article brief!' }],
                      initialValue:getFieldValue(ARTICLE_TITLE)
                    })(
                        <Input addonBefore="摘要" placeholder="Brief" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(ARTICLE_KEYWORDS, {
                      rules: [{ required: true, message: 'Please input article key words!' }],
                      initialValue:getFieldValue(ARTICLE_KEYWORDS)
                    })(
                        <Input addonBefore="关键字" placeholder="Key words" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(ARTICLE_COVER, {
                      rules: [{ required: true, message: 'Please paste or drag cover image!' }],
                      initialValue:getFieldValue(ARTICLE_COVER)
                    })(
                    <Input addonBefore="封面" addonAfter={<Icon type="eye" onClick={()=>{}}/>} onPaste={this.pasteCover} onDrop={this.dropCover} placeholder="拖拽图片或者粘贴图片" allowClear readOnly/>
                    )}
                </Form.Item>            
                <Form.Item >
                    <Button type="primary" htmlType="submit">发布</Button>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(ARTICLE_CONTENT, {
                      rules: [{ required: true, message: 'Please input body!' }],
                      initialValue:getFieldValue(ARTICLE_CONTENT)
                    })(
                        <MarkDownEditor id="editor" ></MarkDownEditor>
                    )}
                </Form.Item>
            </Form> 
        )
    }
    //拖拽
    dropCover=(e)=> {
        e.preventDefault()
        e.stopPropagation()
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
    }
    //粘贴封面
    pasteCover=(e)=>{
        if (!(e.clipboardData && e.clipboardData.items)) {
            alert("浏览器不支持粘贴上传")
        return
        }
        let dataList = e.clipboardData.items
        for (let i = 0; i < dataList.length; i++) {
            console.log('paste',dataList[i])
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
            this.props.form.setFieldsValue({[ARTICLE_COVER]:result.data.filepath}) 
        }).catch(function(e){
            console.log(e)
        })
    }
}

WriteArticleComponent.propTypes={
    [ARTICLE_TITLE]:PropTypes.string.isRequired,
    [ARTICLE_CONTENT]:PropTypes.string.isRequired,
    [ARTICLE_BRIEF]:PropTypes.string.isRequired,
    [ARTICLE_KEYWORDS]:PropTypes.string.isRequired,
    [ARTICLE_COVER]:PropTypes.string.isRequired
};

const mapPropsToFields = (props)=>{
    return {
      [ARTICLE_TITLE]:Form.createFormField({value:props[ARTICLE_TITLE]}),
      [ARTICLE_CONTENT]:Form.createFormField({value:props[ARTICLE_CONTENT]}),
      [ARTICLE_BRIEF]:Form.createFormField({value:props[ARTICLE_BRIEF]}),
      [ARTICLE_COVER]:Form.createFormField({value:props[ARTICLE_COVER]})
    };
  };
  
  const onFieldsChange = (props, fields)=>{
    //  console.log('ccc',props,fields)
  };

  const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
  }
export default connect(mapStateToProps)(Form.create({mapPropsToFields:mapPropsToFields,onFieldsChange:onFieldsChange})(WriteArticleComponent))