import React,{ Component } from 'react'
import {Row,Col} from 'antd'
import RegisterCom from '../../Components/register/register'

class RegisterPage extends Component {
  render() {
      return(
        <div className="register-page-regCom">
        <Row type="flex" justify="space-around" align="middle">
          <Col span={14}>
            <RegisterCom ></RegisterCom>
          </Col>
        </Row>
        </div>
      )
}
}

export default RegisterPage