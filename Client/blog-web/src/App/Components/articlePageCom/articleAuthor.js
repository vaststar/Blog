import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Row, Col, Avatar, Icon} from 'antd'
import moment from 'moment'
import {get} from '../../Common/RequestREST'

const ARTICLE_BASEOBJ="articleBase"
class ArticleAutor extends Component{
    state={}
    render(){
        return (<div>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={1} >
                    <Avatar size="large" icon="user" src={this.state.avatar} /> 
                </Col>
                <Col span={12}>
                    <Row>
                        <div className="article_page_author_name">{this.state.username}</div>
                    </Row>
                    <Row>
                        <Col span={2} > 
                           <Icon type="eye" /> {this.state.browseNumber} 
                        </Col>
                        <Col span={2} > 
                            <Icon type="message" /> {this.state.commentsNumber} 
                        </Col>  
                        <Col span={2} > 
                            <Icon type="heart" /> {this.state.likeNumber} 
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
    }
    //获取作者信息
    getAuthorName=()=>{
        get(this.props.userUrl+"/usernames/"+this.props[ARTICLE_BASEOBJ].userid).then(result=>result.json()).then(result=>{
            
            this.setState({username:result.data});
        }).catch(function(e){
            console.log( e);
        })
    }
    getAuthorAvatar=()=>{
        get(this.props.userUrl+"/useravatars/"+this.props[ARTICLE_BASEOBJ].userid).then(result=>result.json()).then(result=>{
            this.setState({avatar:this.props.fileUrl+"/"+result.data});
        }).catch(function(e){
            console.log( e);
        })
    }
    //获取文章基本信息
    resfreshBrowserNumbers=()=>{
        //获取浏览数量
        get(this.props.browserUrl+"/articles/"+this.props[ARTICLE_BASEOBJ].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({browseNumber:result.data})
            }
        }).catch(function (e){
            console.log(e)
        });
    }
    resfreshLikesNumbers=()=>{
        //根据文章id获取喜欢的人的数量
        get(this.props.likeUrl+"/articles/"+this.props[ARTICLE_BASEOBJ].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({likeNumber:result.data})
            }
        }).catch(function (e){
            console.log(e)
        });
    }
    refreshCommentNumbers=()=>{
        //根据文章id获取评论数量
        get(this.props.commentUrl+"/counts/topcomments/"+this.props[ARTICLE_BASEOBJ].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({commentsNumber:result.data})
            }else{
                console.log('query comments number faile')
            }
        }).catch(function (e){
            console.log(e)
        });
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