import React, { Component } from 'react'

import Header from '../../Common/Header'
import PureArticle from '../../Components/articlePageCom/pureArticleCom'

class ArticlePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="article_page_detail">
                <PureArticle articleid={this.props.location.pathname.split("/").pop()}/>
                </div>
            </div>
           
        )
    }    
}

  
export default ArticlePage