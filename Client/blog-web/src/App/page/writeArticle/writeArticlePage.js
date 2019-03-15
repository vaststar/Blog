import React,{ Component } from 'react'
import Header from '../../Common/Header'

import WriteArticleCom from '../../Components/writeArticleCom/articleWriteCom'

class WritePage extends Component {
  render() {
      return(
          <div>
        <Header/>
        <WriteArticleCom></WriteArticleCom>
        </div>
      )
}
}

export default WritePage