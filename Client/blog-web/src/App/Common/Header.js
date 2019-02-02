import React, { Component } from 'react'
import {connect} from 'react-redux'

import MenuNav from './MenuNav'

import {get} from './RequestREST'

import {changeValid} from '../../Redux/ActionReducer/user'

class Header extends Component {
    render() {
        const {user,valid}=this.props
        return (
            <header>
            <MenuNav username={user.username} ok={valid}></MenuNav>
            </header>
        )
    }
    
    componentDidMount(){
        //通过获取自己的信息，判断是否进入验证
        get("http://127.0.0.1:4444/author/?username="+this.props.user.username).then(result => {
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
export default connect(mapStateToProps,mapDispatch)(Header)



