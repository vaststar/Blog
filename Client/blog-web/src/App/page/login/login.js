import React,{ Component } from 'react'
import BlogLoginForm from './LoginForm'

class Login extends Component {
  render() {
    return (
      <BlogLoginForm userName='uuuu' passWord='yyy' remember='true'></BlogLoginForm>
    );
  }
}

export default Login