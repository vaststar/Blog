import React, { Component } from 'react'
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {postFile} from '../../Common/RequestREST'


class MarkdownEditor extends Component {
    render() {
        return (
            <textarea id="mark-editor"></textarea>
        )
    }
    createSimpleMDE=()=>{
        this.simplemde = new SimpleMDE({
            element: document.getElementById("mark-editor").childElementCount,
            autofocus: true,
            autosave: true,
            status: ["autosave", "lines", "words"],
            spellChecker: false,
            promptURLs: true,
            toolbar: [
                "bold", "italic", "strikethrough", "heading", "code", "quote", "unordered-list",
                "ordered-list", "clean-block", "link", "image",
                 "table", "horizontal-rule", "preview", "side-by-side", "fullscreen","guide"
            ],
            previewRender: function(plainText) {
                return marked(plainText,{
                        renderer: new marked.Renderer(),
                        gfm: true,
                        pedantic: false,
                        sanitize: false,
                        tables: true,
                        breaks: true,
                        smartLists: true,
                        smartypants: true,
                        highlight: function (code) {
                                return highlight.highlightAuto(code).value;
                        }
                });
            }
        });
        //监听粘贴事件
        this.simplemde.codemirror.on('paste',this.receivePaste)
        //监听拖拽事件
        this.simplemde.codemirror.on('drop', this.receiveDrop)
        //监听内容变化实践
        this.simplemde.codemirror.on("change", this.contentChange)
    }
    componentDidMount(){
        const {value} = this.props;
        this.createSimpleMDE();
        if(value){
            this.simplemde.codemirror.setValue(value)
            this.simplemde.codemirror.setCursor(this.simplemde.codemirror.lineCount())
        }
    }
    //拖拽
    receiveDrop=(editor, e)=> {
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
            this.postImage(editor,formData,dataList[i].name)
        }
    }
    //粘贴
    receivePaste=(editor, e) => { // 粘贴图片的触发函数
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
                this.postImage(editor,formData,dataList[i].getAsFile().name)
            }
        }
    }
    //上传图片
    postImage=(editor,formData,filename)=>{
        postFile(this.props.fileUrl+"/"+filename, formData
        ).then(result=>result.json()).then(result=>{
            let url = `![](${this.props.fileUrl+"/"+result.data.filepath})` // 拼接成markdown语法
            editor.setValue(editor.getValue() + url + '\n') // 和编辑框之前的内容进行拼接
            editor.setCursor(editor.lineCount())
        }).catch(function(e){
            console.log(e)
        })
    }
    //内容变化
    contentChange=(editor,e)=>{
        this.props.onChange(editor.getValue())
    }
}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
  }

MarkdownEditor.propTypes={
    "value":PropTypes.string.isRequired,
    "onChange":PropTypes.func.isRequired
};
export default connect(mapStateToProps)(MarkdownEditor)