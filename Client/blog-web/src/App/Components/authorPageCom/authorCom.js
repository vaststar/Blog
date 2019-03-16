import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Avatar} from 'antd'

import {get,post} from '../../Common/RequestREST'

const USER_ID="userid"
class AuthorCom extends Component{
    state={userinfo:{}}
    render(){
        return(<div>
            {this.state.userinfo.avatarurl?
            <Avatar size="large" icon="user" src={this.props.fileUrl+"/"+this.state.userinfo.avatarurl} /> :null}

        </div>)
    }
    componentDidMount(){
        this.refreshAuthorInfo(this.props[USER_ID])
    }
    refreshAuthorInfo=(userid)=>{
        get(this.props.userUrl+"/userinfos/"+userid).then(result=>result.json()).then(result=>{
            if(result.status)
            {
                this.setState({userinfo:result.data})
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