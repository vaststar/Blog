import React, { Component } from 'react'

import Header from '../../Common/Header'
import PureArticle from '../../Components/articlePageCom/pureArticleCom'

class ArticlePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <PureArticle articleid={this.props.location.pathname.split("/").pop()}/>
            </div>
           
        )
    }    
}

  
export default ArticlePage