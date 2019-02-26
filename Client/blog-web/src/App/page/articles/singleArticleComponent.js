import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import moment from 'moment'
import {Row,Col,Icon} from 'antd'

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
            <Row >
                <Col span={20}>
                    <div className="article-single-left">
                        <div className="article-title">
                            <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                                {this.props[ARTICLE_PROPS].title}
                            </a>
                        </div>
                        <div className="article-breif">
                            {this.props.article.breif}
                        </div>
                        <div className="list-footer">
                            <span className="article-note"> 
                                <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                                    <Icon type="eye" /> 0 
                                </a>
                            </span>
                            <span className="article-note" onClick={this.commentClick} > 
                                <Icon type="message" /> {this.state.commentsNumber} 
                            </span>  
                            <span className="article-note"> 
                                <Icon type="heart" /> 0 
                            </span>  
                            <span className="article-note">
                                {moment(this.props.article.uptime,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                        </div>
                    </div>
                </Col>
                <Col span={4}>
                    <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                        <img src={this.props.fileUrl+"/"+this.props[ARTICLE_PROPS].coverurl} className="articleCover" alt="封面丢失"></img>
                    </a>
                </Col>
            </Row>
            <Row>
                {/* {this.state.showComment?<Comment articleid={this.props[ARTICLE_PROPS].articleid}/>:null} */}
            </Row>
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
export default connect(mapStateToProps)(ArticleComponent)