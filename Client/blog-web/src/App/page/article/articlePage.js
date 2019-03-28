import React, { Component } from 'react'
import {Row,Col} from 'antd'

import Header from '../../Common/Header'
import PureArticle from '../../Components/articlePageCom/pureArticleCom'

class ArticlePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={20} >
                        <div className="article_page_detail">
                        <PureArticle articleid={this.props.location.pathname.split("/").pop()}/>
                        </div>
                    </Col>
                </Row>
            </div>
           
        )
    }    
}

  
export default ArticlePage