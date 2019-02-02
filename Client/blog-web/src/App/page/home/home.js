import React, { Component } from 'react'
import {connect} from 'react-redux'
import Header from '../../Common/Header'

class HomePage extends Component {
    render() {
        const {token,user,valid}=this.props
        return (
            <div>
                {/* <Header></Header> */}
                <Header/>
                <li>AAA{token===null?'未登录':user.username}</li>
            </div>
        )
    }

}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
const Ho =   connect(mapStateToProps)(HomePage)
export default Ho