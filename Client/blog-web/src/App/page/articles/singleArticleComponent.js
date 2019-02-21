import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter ,Redirect} from 'react-router-dom'
import moment from 'moment'

import Comment from '../comments/allComments'
import {get} from '../../Common/RequestREST'


const ARTICLE_PROPS = 'article';
class ArticleComponent extends Component {
    state={commentsNumber:0,showComment:false}
    //点击评论按钮
    commentClick=()=>{
        this.setState({showComment:!this.state.showComment})
    }
    render(){
        return (
            <div className='articlesingle' >
                <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                <div className="article-title">{this.props[ARTICLE_PROPS].title}</div>
                </a>
                <div className="article-breif">
                    {this.props.article.breif}
                </div>
                <div className="list-footer">
                  <span className="article-note"> 
                    <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                    · 阅读() 
                    </a>
                </span>
                  <span className="article-note" onClick={this.commentClick} > · 评论({this.state.commentsNumber}) </span>  
                  <span className="article-note"> · 赞() </span>  
                  <span className="article-note">{moment(this.props.article.uptime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日')}</span>
                </div>
                {this.state.showComment?<Comment articleid={this.props[ARTICLE_PROPS].articleid}/>:null}
            </div>
        );
    }
    refreshCommentNumbers=()=>{
        //根据文章id获取其所有评论，已经为树状结构，
        get(this.props.articleUrl+"/counts/topcomments/"+this.props[ARTICLE_PROPS].articleid).then(response => response.json()).then(result=>{
            this.setState({commentsNumber:result.data})
        }).catch(function (e){
            console.log(e)
        });
    }
    componentDidMount(){
        this.refreshCommentNumbers()
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
export default withRouter(connect(mapStateToProps)(ArticleComponent))