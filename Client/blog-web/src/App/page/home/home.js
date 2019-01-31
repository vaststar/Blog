import React, { Component } from 'react'
import {connect} from 'react-redux'

import Header from '../../Common/header'

import {changeUser,changeToken} from '../../Redux/ActionReducer/user'

class HomePage extends Component {
    render() {
        const {token,user}=this.props
        return (
            <div>
                <Header></Header>
                <li>AAA{token===null?'未登录':user.username}</li>
            </div>
        )
    }
}

const  mapStateToProps =(state,props)=>{
    console.log('9999',state)
    return {
      ...state.userReducer
    }
}
  
const mapDispatch =(dispatch,ownProps)=>{
  return {
      ChangeUser:(data)=>{
        dispatch(changeUser(data))
      },
      ChangeToken:(data)=>{
        dispatch(changeToken(data))
      }
  }
}
const Ho =   connect(mapStateToProps,mapDispatch)(HomePage)
export default Ho