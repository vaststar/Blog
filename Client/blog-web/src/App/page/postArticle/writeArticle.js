import React, { Component } from 'react'

import Header from '../../Common/Header'
import MarkDownEditor from './markDownEditor'

class WriteArticleComponent extends Component {
    render() {
        return (
            <div>
            <Header  /> 
            <MarkDownEditor id="editor"></MarkDownEditor>
            </div> 
        )
    }
}

export default WriteArticleComponent