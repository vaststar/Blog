import React, { Component } from 'react'
import Header from '../../Common/Header'

import AuthorDetail from './authorDetail'

class AuthorPage extends Component {
    state={}
    render() {
        return (<div className="author_page">
                <Header/>
                <div className="author_page_content">
                    <AuthorDetail/>
                </div>
        </div>)
    }
    
}
  
  
export default AuthorPage