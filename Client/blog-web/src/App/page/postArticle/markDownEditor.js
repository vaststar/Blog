import React, { Component } from 'react'
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css'
import {connect} from 'react-redux'

import {post} from '../../Common/RequestREST'


class MarkdownEditor extends Component {
    render() {
        return (
            <textarea id="mark-editor" className='CodeMirror-scroll'></textarea>
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
        //监听拖拽事件
        this.simplemde.codemirror.on('drop', this.receiveDrop)
    }
    componentDidMount(){
        this.createSimpleMDE();
    }
    receiveDrop=(editor, e)=> {
        console.log("codemirror on drop")
        if (!(e.dataTransfer && e.dataTransfer.files)) {
            alert("浏览器不支持拖拽上传")
            return
        }
        let dataList = e.dataTransfer.files
        console.log("dataList:" + dataList)
        console.log(dataList)
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].type.indexOf('image') === -1 ) {
                alert("仅可上传图片")
                continue
            }
            let formData = new FormData()
            formData.append('file', dataList[i],dataList[i].name)
            console.log('ggggggg',formData.get('file'))
            //拖拽之后，上传图片到服务器，返回结果写入编辑器
            console.log('oooo',this.props.fileUrl+"/",formData)
            fetch(this.props.fileUrl+"/"+"test.png", {
                method:'POST',
                mode: "cors",
                body:formData
            }).then(result=>{
                console.log('post',result)
            }).catch(function(e){
                console.log(e)
            })
        }
        
        e.preventDefault()
        e.stopPropagation()
    }
}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
  }

export default connect(mapStateToProps)(MarkdownEditor)