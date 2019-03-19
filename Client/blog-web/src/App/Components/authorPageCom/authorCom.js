import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Avatar,Row,Col,Divider,Tag} from 'antd'

import {get} from '../../Common/RequestREST'

const USER_ID="userid"
const COLOR_ARR=["magenta","red","volcano","orange","gold","lime","green","cyan","blue","geekblue","purple"]
class AuthorCom extends Component{
    state={}
    render(){
        return(<div>
            <Row type="flex" justify="center" align="middle">
            <Col span={8}>
        {this.state.avatarUrl&&<Avatar className="author_avatar" size="large" icon="user" src={this.props.fileUrl+"/"+this.state.avatarUrl} />} 
            </Col>
            <Col span={16}>
            {this.state.username}
            </Col>
            </Row>
            <Divider orientation="left">简介</Divider>
            <Row>
              <h3>{this.state.introduces&&this.state.introduces.resume}</h3>
            </Row>
            <Divider orientation="left">标签</Divider>
            <Row>
                {this.state.introduces&&
                this.state.introduces.tags.split(" ").map((item,index)=>{
                    return  <Tag key={index} color={COLOR_ARR[Math.floor(Math.random()*COLOR_ARR.length)]} className="author_introduce_tag">{item}</Tag>
                })
                }
            </Row>
        </div>)
    }
    componentDidMount(){
        this.refreshAuthorInfo(this.props[USER_ID])
        this.refreshAuthorName(this.props[USER_ID])
        this.refreshAuthorIntroduce(this.props[USER_ID])
    }
    refreshAuthorInfo=(userid)=>{
        get(this.props.userUrl+"/avatars/"+userid).then(result=>result.json()).then(result=>{
            if(result.status)
            {
                this.setState({avatarUrl:result.data})
            }
        }).catch(function(e){
            console.log( e);
        })
    }
    refreshAuthorName=(userid)=>{
        get(this.props.userUrl+"/usernames/"+userid).then(result=>result.json()).then(result=>{
            if(result.status)
            {
                this.setState({username:result.data})
            }
        }).catch(function(e){
            console.log( e);
        })
    }
    refreshAuthorIntroduce=(userid)=>{
        get(this.props.introduceUrl+"/"+userid).then(result=>result.json()).then(result=>{
            if(result.status)
            {
                this.setState({introduces:result.data})
            }
        }).catch(function(e){
            console.log( e);
        })
    }
}

//类型检查，需要传入 userid
AuthorCom.propTypes={
    [USER_ID]:PropTypes.string.isRequired
};

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(AuthorCom)