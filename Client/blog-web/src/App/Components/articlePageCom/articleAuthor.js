import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Row, Col, Avatar, Icon, message} from 'antd'
import moment from 'moment'
import {get,post,del} from '../../Common/RequestREST'

const ARTICLE_BASEOBJ="articleBase"
class ArticleAutor extends Component{
    state={personalLike:false}
    getLinkToUrl= (url)=>{
        //处理登陆完之后的跳转页面
        return ({
            pathname:url,
            state:{from:this.props.location.pathname}})
    }
    render(){
        return (<div>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={1} >
                    {this.state.avatar&&
                    <a className="author-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/author/'+this.props[ARTICLE_BASEOBJ].userid}>
                        <Avatar className="article_author_avatar"  size="large" icon="user" src={this.state.avatar} /> 
                    </a>}
                </Col>
                <Col span={12}>
                    <Row>
                        <a className="author-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/author/'+this.props[ARTICLE_BASEOBJ].userid}>
                        <div className="article_page_author_name">{this.state.username}</div>
                        </a>
                    </Row>
                    <Row>
                        <Col span={2} > 
                           <Icon type="eye" /> {this.state.browseNumber} 
                        </Col>
                        <Col span={2} > 
                            <Icon type="message" /> {this.state.commentsNumber} 
                        </Col>  
                        <Col span={2} > 
                            <div className="likes_article" onClick={this.likesClick}>
                            {this.state.personalLike?<Icon type="heart" theme="twoTone" twoToneColor="#ff0000"/>:<Icon type="heart" />} {this.state.likeNumber} 
                            </div>
                        </Col> 
                        <Col span={8} >
                            {moment(this.props[ARTICLE_BASEOBJ].uptime,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}
                        </Col>
                        <Col span={12}/> 

                    </Row>
                </Col>
                <Col span={10}/>
            </Row>
                
                
        </div>)
    }
    componentDidMount(){
        this.refreshAll();
    }
    //刷新信息
    refreshAll=()=>{
        this.getAuthorName();
        this.getAuthorAvatar();
        this.resfreshBrowserNumbers();
        this.resfreshLikesNumbers();
        this.refreshCommentNumbers();
        this.personalLikeArticleJudge();
    }
    //获取作者信息
    getAuthorName=()=>{
        get(this.props.userUrl+"/usernames/"+this.props[ARTICLE_BASEOBJ].userid).then(result=>result.json()).then(result=>{
            if (result.status){
                this.setState({username:result.data});
            }else{
                message.error("获取用户名失败！");
            }
        })
    }
    //获取头像
    getAuthorAvatar=()=>{
        get(this.props.userUrl+"/avatars/"+this.props[ARTICLE_BASEOBJ].userid).then(result=>result.json()).then(result=>{
            if (result.status){
                this.setState({avatar:this.props.fileUrl+"/"+result.data});
            }else{
                message.error("获取头像失败");
            }
        })
    }
    //获取文章基本信息
    resfreshBrowserNumbers=()=>{
        //获取浏览数量
        get(this.props.browserUrl+"/articles/"+this.props[ARTICLE_BASEOBJ].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({browseNumber:result.data})
            }else{
                message.error("获取浏览数量失败");
            }
        })
    }
    //根据文章id获取喜欢的人的数量
    resfreshLikesNumbers=()=>{
        get(this.props.likeUrl+"/articles/"+this.props[ARTICLE_BASEOBJ].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({likeNumber:result.data})
            }else{
                message.error("获取点赞数量失败");
            }
        })
    }
    //根据文章id获取评论数量
    refreshCommentNumbers=()=>{
        get(this.props.commentUrl+"/counts/topcomments/"+this.props[ARTICLE_BASEOBJ].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({commentsNumber:result.data})
            }else{
                message.error("获取评论数量失败");
            }
        })
    }
    //判断是否是自己喜欢的
    personalLikeArticleJudge=()=>{
        //判断是否是自己喜欢的
        get(this.props.likeUrl+"/belongs/articles/"+this.props[ARTICLE_BASEOBJ].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({personalLike:result.data})
            }
        })
    }
    //单击喜欢按钮
    likesClick=()=>{
        if(this.state.personalLike){
            //删除该文章的喜欢记录
            del(this.props.likeUrl+"/articles/"+this.props[ARTICLE_BASEOBJ].articleid).then(response => response.json()).then(result=>{
                if(result.status){
                    this.setState({personalLike:false})
                    this.resfreshLikesNumbers()
                }else{
                    message.error("取消点赞失败");
                }
            })
        }else{
            post(this.props.likeUrl+"/articles/",{'articleid':this.props[ARTICLE_BASEOBJ].articleid}).then(response => response.json()).then(result=>{
                if(result.status){
                    this.setState({personalLike:true})
                    this.resfreshLikesNumbers()
                }else{
                    message.error("点赞失败");
                }
            })
        }
    }
}

//类型检查，需要传入 {articleid:**,userid:**}等
ArticleAutor.propTypes={
    [ARTICLE_BASEOBJ]:PropTypes.object.isRequired
};

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}

export default connect(mapStateToProps)(ArticleAutor)