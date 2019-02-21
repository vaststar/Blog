import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input , Row, Col} from 'antd';

const COMMENT_SUBMIT="submitfunc"
class TextEdit extends Component{
    render(){
        return (<div className="commentTextEdit">
        <Row>
            <Col span={21}><Input className="commentTextArea" id="comment-input-area"/></Col>
            <Col span={3}><Button type="primary" className="commentButton" onClick={this.clickButton}>评论</Button> </Col>
        </Row>
        </div>)
    }
    clickButton=()=>{
        var submitObj = document.getElementById('comment-input-area');
        if(submitObj.value.length !== 0 )
        {
            this.props[COMMENT_SUBMIT](submitObj.value)
        }
    }
}
// 类型检查，需要传入 userName,password,remember以及回调函数
TextEdit.propTypes={
    [COMMENT_SUBMIT]:PropTypes.func.isRequired
  };
export default TextEdit