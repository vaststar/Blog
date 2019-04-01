import React,{ Component } from 'react'
import {Row,Col} from 'antd'
import RegisterCom from '../../Components/register/register'

class RegisterPage extends Component {
  render() {
      return(
        <div className="register-page-regCom">
        <Row type="flex" justify="space-around" align="middle">
          <Col md={14} sm={16} xs={18} className="register-main-Com">
            <RegisterCom ></RegisterCom>
          </Col>
        </Row>
        </div>
      )
}
}

export default RegisterPage