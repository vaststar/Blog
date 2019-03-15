import React, { Component } from 'react'
import Header from '../../Common/Header'

import Articles from '../../Components/articles/allArticles'

class HomePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className='articlecom'>
                    <Articles ></Articles>
                </div>
                
            </div>
        )
    }

}
  
export default HomePage