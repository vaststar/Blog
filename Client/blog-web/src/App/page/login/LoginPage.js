import React,{ Component } from 'react'
import {Row,Col} from 'antd'

import LoginCom from '../../Components/login/login'

class LoginPage extends Component {
  render() {
      return(
        <div >
          <Row type="flex" justify="space-around" align="middle">
              <Col span={8} className="login_page_loginForm">
                <LoginCom></LoginCom>
              </Col>
          </Row> 
        </div>
      )
}
}

export default LoginPage