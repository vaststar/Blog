import React,{ Component } from 'react'
import {Row,Col} from 'antd'
import Header from '../../Common/Header'

import WriteArticleCom from '../../Components/writeArticleCom/articleWriteCom'

class WritePage extends Component {
  render() {
      return(
          <div>
            <Header/>
            <Row type="flex" justify="space-around" align="middle">
              <Col md={16} sm={18} xs={20} className="write_article_Com" >
                <WriteArticleCom></WriteArticleCom>
              </Col>
            </Row>
        </div>
      )
}
}

export default WritePage