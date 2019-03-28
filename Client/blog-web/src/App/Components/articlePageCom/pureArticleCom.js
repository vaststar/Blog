import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import {Divider,message} from 'antd'

import {get,post} from '../../Common/RequestREST'
import Comments from '../comments/allComments'
import ArticleAutor from './articleAuthor'

const ARTICLE_ID = "articleid"
class PureArticleCom extends Component {
    state={content:"",articleBase:{}}
    render() {
        return (
            <div className="article_page_div">
                <div className="article_page_title">
                    <h1 >{this.state.articleBase.title}</h1>
                </div>
                {this.state.articleBase.articleid && this.state.articleBase.userid?
                <div className="article_page_author">
                    <ArticleAutor articleBase={this.state.articleBase}></ArticleAutor>
                </div>:null
                }
                <Divider/>
                <div>
                    <h3 className="article_page_brief">摘要: {this.state.articleBase.breif}</h3>
                </div>
                <div>
                    <h3 className="article_page_keys">关键词: {this.state.articleBase.keywords}</h3>
                </div>
                <Divider/>
                <div className="article_page_body">
                    <ReactMarkdown source={this.state.content} />
                </div>
                <div className="article_page_comment">
                    <Comments articleid={this.props.articleid} ></Comments>
                </div>
            </div>
        )
    }
    componentDidMount(){
        //获取文章基本信息
        get(this.props.articleUrl+"/"+this.props.articleid).then(response => response.json()).then(result=>{
            if(result.status){
                //获取文章基本信息
                this.setState({articleBase:result.data})

                //读取文本内容
                let bodyurl = result.data.bodyurl.replace("\\","/");
                get(this.props.fileUrl+"/"+bodyurl).then(result=>result.text()).then(result=>{
                    this.setState({content:result});
                    this.browserHistory();
                })
            }else{
                message.error("找不到该文章，id:"+this.props.articleid)
            }
        })
    }
    browserHistory=()=>{//添加一条浏览历史
        post(this.props.browserUrl+"/articles/",{'articleid':this.props.articleid})
    }
}

//类型检查，需要传入 articleid
PureArticleCom.propTypes={
    [ARTICLE_ID]:PropTypes.string.isRequired
};

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(PureArticleCom)