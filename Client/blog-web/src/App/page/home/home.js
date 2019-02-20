import React, { Component } from 'react'
import {connect} from 'react-redux'
import Header from '../../Common/Header'

import Articles from '../articles/allArticles'

class HomePage extends Component {
    render() {
        const {token,user,valid}=this.props
        return (
            <div>
                <Header/>
                <Articles class='articlecom'></Articles>
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