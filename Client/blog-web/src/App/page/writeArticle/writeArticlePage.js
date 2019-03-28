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
              <Col span={18} className="write_article_Com">
                <WriteArticleCom></WriteArticleCom>
              </Col>
            </Row>
        </div>
      )
}
}

export default WritePage