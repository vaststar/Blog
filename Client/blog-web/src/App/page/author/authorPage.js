import React, { Component } from 'react'
import {Row,Col} from 'antd'
import Header from '../../Common/Header'

import AuthorDetail from './authorDetail'

class AuthorPage extends Component {
    state={}
    render() {
        return (<div className="author_page">
                <Header/>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={16} className="author_page_content">
                        <AuthorDetail/>
                    </Col>
                </Row>
        </div>)
    }
    
}
  
  
export default AuthorPage