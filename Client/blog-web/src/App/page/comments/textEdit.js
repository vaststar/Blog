import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input , Row, Col} from 'antd';

const COMMENT_SUBMIT="submitfunc"
class TextEdit extends Component{
    state={inputVal:null}
    render(){
        return (<div className="commentTextEdit">
        <Row gutter={16} type="flex" justify="space-around">
            <Col span={22}><Input id="comment-input-area" onPressEnter={this.clickButton} onChange={this.inputChange} value={this.state.inputVal}/></Col>
            <Col span={1}><Button type="primary" onClick={this.clickButton}>评论</Button> </Col>
        </Row>
        </div>)
    }
    clickButton=()=>{
        if(this.state.inputVal && this.state.inputVal.length !== 0 )
        {
            this.props[COMMENT_SUBMIT](this.state.inputVal)
            this.setState({inputVal:null});
        }
    }
    inputChange=(e)=>{
        this.setState({inputVal:e.target.value})
    }
}
// 类型检查，需要传入回调函数
TextEdit.propTypes={
    [COMMENT_SUBMIT]:PropTypes.func.isRequired
  };
export default TextEdit