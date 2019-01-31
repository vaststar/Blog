import React,{ Component } from 'react'
import {connect} from 'react-redux';

import BlogLoginForm from './LoginForm'
import {changeUser} from '../../Redux/ActionReducer/user'

class Login extends Component {

  handleSubmit =(form)=>{
    console.log('hhhhhh',form)
  }

  render() {
    const {username,password,remember,ChangeUser} = this.props;
    return (
      <div>
      <BlogLoginForm userName={username} password={password} remember={remember} submitForm={this.handleSubmit} forgetUrl='http://www.baidu.com' registerUrl='http://www.baidu.com'></BlogLoginForm>
      <input defaultValue={username}></input>
      <button onClick = {()=>{ChangeUser({'username':'yu','password':'ui','remember':true})} }>佳佳</button>
      <div>A{username}</div>
      </div>
    );
  }
}

const  mapStateToProps =(state,props)=>{
  console.log('wowo',state)
  return {
    ...state
  }
}

const mapDispatch =(dispatch,ownProps)=>{
  return {
      ChangeUser:(data)=>{
        dispatch(changeUser(data))
      }
  }
}

const  LoginPage =  connect(mapStateToProps,mapDispatch)(Login)
export default LoginPage