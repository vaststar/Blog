import React,{ Component } from 'react'
import Header from '../../Common/Header'

import WriteArticleCom from '../../Components/writeArticleCom/articleWriteCom'

class WritePage extends Component {
  render() {
      return(
          <div>
        <Header/>
        <div className="write_article_Com">
        <WriteArticleCom></WriteArticleCom>
        </div>
        </div>
      )
}
}

export default WritePage