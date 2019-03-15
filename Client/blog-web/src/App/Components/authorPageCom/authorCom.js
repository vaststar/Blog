import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {get,post} from '../../Common/RequestREST'

const USER_ID="userid"
class AuthorCom extends Component{
    state={}
    render(){
        return(<div>

        </div>)
    }
    componentDidMount(){
        this.refreshAll()
    }
    refreshAll=()=>{
        if (typeof this.props[USER_ID] == "undefined" || this.props[USER_ID] == null || this.props[USER_ID] == ""){
            if(this.props.valid){
                //获取id并更新
                get(this.props.userUrl+"/bases/"+this.props.user.username).then(result=>result.json()).then(result=>{
                    if(result.status){
                        this.setState({userid:result.data.id});
                        this.refreshAuthorInfo(result.data.id)
                    }
                }).catch(function(e){
                    console.log( e);
                })
            }
        }else{
            this.setState({userid:this.props[USER_ID]})
            this.refreshAuthorInfo(this.props[USER_ID])
        }
    }
    refreshAuthorInfo=(userid)=>{
        get(this.props.userUrl+"/userinfos/"+userid).then(result=>result.json()).then(result=>{
            if(result.status)
            {

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