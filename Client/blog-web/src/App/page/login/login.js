import React,{ Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';

import BlogLoginForm from './LoginForm'
import {changeUser,changeToken} from '../../Redux/ActionReducer/user'

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {username,password,remember,ChangeUser,ChangeToken} = this.props;
    return (
      <div>
      <BlogLoginForm userName={username} password={password} remember={remember} submitForm={this.handleSubmit} forgetUrl='http://www.baidu.com' registerUrl='http://www.baidu.com'></BlogLoginForm>
      </div>
    );
  }
  handleSubmit =(form)=>{
    //定义获取token函数
    function getToken(username,password,ChangeToken){
      const url = "http://127.0.0.1:4444/author/token/";
      fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          },
          body:JSON.stringify({'username':username,'password':password})
          
      }).then(response => response.json())
          .then(result => {
            console.log('rrr',result)
            // 在此处写获取数据之后的处理逻辑
            dealWithToken(result,ChangeToken);

          }).catch(function (e) {
              console.log("fetch fail", e);
          });
    }
    //获取token
   function dealWithToken(token,ChangeToken){
    console.log('token is',token)
    if(token.status){
      ChangeToken(token.data);
    }
    else{
      ChangeToken(null);
      console.log('用户名或者密码错误')
    }
   }
   //发起请求
   getToken(form.userName,form.password,this.props.ChangeToken)
   this.props.history.push('/');
  }
}

const  mapStateToProps =(state,props)=>{
  return {
    ...state.userReducer.user
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

const  LoginPage =  withRouter(connect(mapStateToProps,mapDispatch)(Login))
export default LoginPage