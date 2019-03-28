import React, { Component } from 'react'
import {Row,Col} from 'antd'
import Header from '../../Common/Header'

import PersonalPageCom from '../../Components/personalPageCom/personalPageCom'

class PersonalPage extends Component {
    render() {
        return (
            <div>
                <Header/> 
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={14}>
                        <div className="personal_setting_Com">
                        <PersonalPageCom />    
                        </div>  
                    </Col>
                </Row>         
            </div>
        )
    }

}
  
export default PersonalPage