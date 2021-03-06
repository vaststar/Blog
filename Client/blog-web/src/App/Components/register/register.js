import React,{ Component } from 'react'
import {connect} from 'react-redux'
import { withRouter ,Redirect} from 'react-router-dom'
import {message} from 'antd';

import {post} from '../../Common/RequestREST'
import BlogRegisterForm from './RegisterForm'
import {changeUser} from '../../../Redux/ActionReducer/user'

class Register extends Component {
    state = {registerok:false}
    handleSubmit =(form)=>{
      post(this.props.userUrl+"/",
        {'username':form.nickname,'password':form.password,'realname':form.realname,'idcard':form.idcard,'cellphone':form.phone,'email':form.email,'emailcode':form.emailcode,'avatarurl':form.avatarurl}
      ).then(response => response.json()).then(result => {
        // 在此处写获取数据之后的处理逻辑
      if(result.status){
        this.props.ChangeUser({'username':form.nickname,'password':'','remember':true})
        this.setState({registerok:true})
      }
      else{
        message.error(result.msg)
      }
      })
    }
    
    render(){
        if (this.state.registerok){
            return <Redirect to='/login/' />; 
        }
        return (
            <div>
                <BlogRegisterForm agreementUrl='https://www.baidu.com' submitForm={this.handleSubmit}/>
            </div>
        );
    }
}

const  mapStateToProps =(state,props)=>{
  return {
    userUrl:state.userReducer.userUrl
  }
}

const mapDispatch =(dispatch,ownProps)=>{
  return {
      ChangeUser:(data)=>{
        dispatch(changeUser(data))
      }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatch)(Register))