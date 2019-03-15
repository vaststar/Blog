import React,{ Component } from 'react'

import LoginCom from '../../Components/login/login'

class LoginPage extends Component {
  render() {
      return(
        <div className="login_page_loginForm">
          <LoginCom></LoginCom>
        </div>
      )
}
}

export default LoginPage