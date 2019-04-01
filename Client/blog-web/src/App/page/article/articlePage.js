import React, { Component } from 'react'
import {Row,Col} from 'antd'

import Header from '../../Common/Header'
import PureArticle from '../../Components/articlePageCom/pureArticleCom'

class ArticlePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Row type="flex" justify="space-around" align="middle" >
                    <Col md={14} sm={18} xs={20} className="article_page_all" >
                        <PureArticle articleid={this.props.location.pathname.split("/").pop()}/>
                    </Col>
                </Row>
            </div>
        )
    }    
}

  
export default ArticlePage