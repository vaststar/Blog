import React, { Component } from 'react'
import {connect} from 'react-redux'

import {get} from '../../Common/RequestREST'
import MenuNav from '../../Common/MenuNav'

import {changeValid} from '../../../Redux/ActionReducer/user'

class HomePage extends Component {
    render() {
        const {token,user,valid}=this.props
        return (
            <div>
                {/* <Header></Header> */}
                <header>
                <MenuNav username={user.username} ok={valid}></MenuNav>
                </header>
                <li>AAA{token===null?'未登录':user.username}</li>
            </div>
        )
    }

    componentDidMount(){
        get("http://127.0.0.1:4444/author/").then(result => {
            console.log('getauthor',result)
            if(result.status){
                this.props.ChangeValid(true);
            }else{
                this.props.ChangeValid(false);
            }
            return '';
        }).catch(function (e) {
            this.props.ChangeValid(false);
            console.log("fetch fail", e);
        });
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
      ChangeValid:(data)=>{
          dispatch(changeValid(data))
      }
  }
}
const Ho =   connect(mapStateToProps,mapDispatch)(HomePage)
export default Ho