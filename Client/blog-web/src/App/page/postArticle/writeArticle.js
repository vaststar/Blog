import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom'

import {
    Form, Icon, Input, Button, Modal
  } from 'antd';


import Header from '../../Common/Header'
import MarkDownEditor from './markDownEditor'
import {postFile,post} from '../../Common/RequestREST'

const ARTICLE_TITLE='articleTitle'
const ARTICLE_CONTENT='articleContent'
const ARTICLE_BRIEF='articleBrief'
const ARTICLE_KEYWORDS='articleKeys'
const ARTICLE_COVER='articleCover'

class WriteArticleComponent extends Component {
    state={previewVisible: false,coverurl:null}

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
              //上传文章

            console.log('Received values of form: ', values);
            post(this.props.articleUrl+"/bases/",{'title': values.articleTitle,'brief':values.articleBrief,'keywords':values.articleKeys,'coverurl':values.articleCover.replace("\\","/"),'body':values.articleContent})
            .then(res=>res.json()).then(result=>{
                if(result.status){
                    //跳转到主页
                    this.props.history.push("/");
                }
                console.log('post article',result)
            }).catch(function(e){
                console.log(e)
            })
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
                      initialValue:getFieldValue(ARTICLE_COVER),
                      normalize:this.normalAll
                    })(
                    <Input addonBefore="封面" addonAfter={<Icon type="eye" onClick={this.viewCover}/>} 
                      onPaste={this.pasteCover} onDrop={this.dropCover}
                      placeholder="拖拽图片或者粘贴图片" allowClear readOnly/>
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
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.coverurl} />
                </Modal>
            </Form> 
        )
    }
    //监听item内容修改
    normalAll=(value, prevValue, allValues)=>{
        this.setState({coverurl:this.props.fileUrl+"/"+value.replace("\\","/")})
        return value
    }
    //预览封面
    viewCover=()=>{this.setState({previewVisible: true});}
    //关闭预览封面
    handleCancel = () => this.setState({ previewVisible: false })
    //拖拽
    dropCover=(e)=> {
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
    pasteCover=(e)=>{
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
  };

  const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
  }
export default withRouter(connect(mapStateToProps)(Form.create({mapPropsToFields:mapPropsToFields,onFieldsChange:onFieldsChange})(WriteArticleComponent)))