import React, { Component } from 'react'
import Header from '../../Common/Header'

import AuthorCom from '../../Components/authorPageCom/authorCom'

class HomePage extends Component {
    render() {
        // console.log('cccc',this.props.location.pathname.split("/").pop())
        return (
            <div>
                <Header/>
                <div className='author_page_Com'>
                    <AuthorCom userid={this.props.location.pathname.split("/").pop()}></AuthorCom>
                </div>                
            </div>
        )
    }

}
  
export default HomePage