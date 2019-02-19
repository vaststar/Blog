import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Comment from './commentComponent'

import {get} from '../../Common/RequestREST'


const ARTICLE_PROPS = 'article';
class ArticleComponent extends Component {
    state={comments:[],showComment:false}
    //转换时间
    dateTranfer=(datestr)=>{
        let ymd = datestr.split(' ')[0]
        let y=ymd.split('-')[0]
        let m=ymd.split("-")[1]
        let d=ymd.split('-')[2]
        return y+'年'+m+'月'+d+'日'
    }
    //点击评论按钮
    commentClick=()=>{
        this.setState({showComment:!this.state.showComment})
    }
    render(){
        // console.log('hhhh',this.props)
        return (
            <div className='articlesingle'>
                <h3 className="article-title">{this.props.article.title}</h3>
                <div className="article-breif">
                    {this.props.article.breif}
                </div>
                <div className="list-footer">
                  <span>{this.dateTranfer(this.props.article.uptime)}</span>
                  <span className='article-class'>[文本博客]</span>
                  <span className="article-note"> · <a >阅读 </a></span>
                  <span className="article-note"> · 收藏 </span>
                  <span className="article-note" onClick={this.commentClick} > · 评论({this.state.comments.length}) </span>  
                  <span className="article-note"> · 转发 </span>  
                  <span className="article-note"> · 赞 </span>  
                </div>
                {this.state.showComment?<Comment comments={this.state.comments}/>:""}
            </div>
        );
    }
    componentDidMount(){
        //根据文章id获取其所有评论，已经为树状结构，
        get(this.props.articleUrl+"/comments/"+this.props.article.articleid).then(result=>{
            this.setState({comments:result.data})
            console.log('sdfsdfsdf',result.data)
        }).catch(function (e){

        });
    }
}

//类型检查，需要传入 userName,password,remember以及回调函数
ArticleComponent.propTypes={
    [ARTICLE_PROPS]:PropTypes.object.isRequired
  };
  
const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
export default connect(mapStateToProps)(ArticleComponent)