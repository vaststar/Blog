import React, { Component } from 'react'
import {Row,Col} from 'antd'
import Header from '../../Common/Header'

import Articles from './allArticles'
class HomePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={12} className="articlecom">
                        <Articles ></Articles>
                    </Col>
                </Row>
            </div>
        )
    }
}
  
export default HomePage