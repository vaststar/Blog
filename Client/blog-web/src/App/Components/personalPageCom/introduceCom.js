import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Divider,Row,Col,Tag,Tooltip,Input,Icon,Button} from 'antd'

import {get,put} from '../../Common/RequestREST'

const COLOR_ARR=["magenta","red","volcano","orange","gold","lime","green","cyan","blue","geekblue","purple"]
class IntroduceCom extends Component{
    state={userid:'',tagsOP:{tags: null,
                     inputVisible: false,
                     inputValue: ''},
            resumeOP:{resume:null,
                    inputVisible: false,
                    inputValue: ''}
        }
    //标签操作
    handleClose = (removedTag) => {
        let state = this.state;
        const tas = this.state.tagsOP.tags.filter(tag => tag !== removedTag);
        put(this.props.introduceUrl+"/tags/",{'tags':tas.join(" ")}).then(response => response.json()).then(result => {
            // 在此处写获取数据之后的处理逻辑
            if(result.status){
                state.tagsOP.tags = tas;
                this.setState(state);              
            }
          }).catch(function (e) {
              console.log("update tags fail", e);
          });    
    }
    
    showTagInput = () => {
      let state = this.state;
      state.tagsOP.inputVisible = true;
      this.setState(state, () => this.tagsInput.focus());
    }
    
    handleTagInputChange = (e) => {
        let state = this.state;
        state.tagsOP.inputValue = e.target.value;
      this.setState(state);
    }
    
    handleTagInputConfirm = () => {
      const state = this.state;
      const inputValue = state.tagsOP.inputValue;
      let tags = state.tagsOP.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      state.tagsOP.tags = tags;
      state.tagsOP.inputValue="";
      state.tagsOP.inputVisible=false;
      put(this.props.introduceUrl+"/tags/",{'tags':tags.join(" ")}).then(response => response.json()).then(result => {
          // 在此处写获取数据之后的处理逻辑
          if(result.status){
              this.setState(state);              
          }
        }).catch(function (e) {
            console.log("update tags fail", e);
        });  
    }
    saveTagInputRef= input => this.tagsInput = input
//简介操作
    showResumeInput = () => {
        let state = this.state;
        state.resumeOP.inputVisible = true;
        state.resumeOP.inputValue = state.resumeOP.resume;
        this.setState(state, () => {this.resumeInput.focus();});
    }
    
    handleResumeInputChange = (e) => {
        let state = this.state;
        state.resumeOP.inputValue = e.target.value;
        this.setState(state);
    }
    
    handleResumeInputConfirm = () => {
      const state = this.state;
      const inputValue = state.resumeOP.inputValue;
      state.resumeOP.resume = inputValue;
      state.resumeOP.inputValue="";
      state.resumeOP.inputVisible=false;
      put(this.props.introduceUrl+"/resumes/",{'resume':inputValue}).then(response => response.json()).then(result => {
          // 在此处写获取数据之后的处理逻辑
          if(result.status){
              this.setState(state);              
          }
        }).catch(function (e) {
            console.log("update tags fail", e);
        });  
    }
    saveResumeInputRef= input => this.resumeInput = input
    render(){return (<div>
        <Row type="flex" justify="center" align="middle" >
            <Col span={2}>
            <h2>简介：</h2>
            </Col>
            <Col span={22}>
            <Button type="primary" size={'small'} onClick={this.showResumeInput}>编辑</Button>
            </Col>
        </Row>
        <Row>
            {!this.state.resumeOP.inputVisible &&<h3>{this.state.resumeOP.resume}</h3>}
            {this.state.resumeOP.inputVisible && (
              <Input
                ref={this.saveResumeInputRef}
                type="text"
                value={this.state.resumeOP.resume}
                onChange={this.handleResumeInputChange}
                onBlur={this.handleResumeInputConfirm}
                onPressEnter={this.handleResumeInputConfirm}
              />
            )}
            
        </Row>
        <Divider/>
        <div>
            
            <Row>
        <h2>标签：</h2>
            {this.state.tagsOP.tags&&
                this.state.tagsOP.tags.map((item,index)=>{
                    const isLongTag = item.length > 20;
                    const tagElem = <Tag key={item} closable={this.state.mouseInTags} afterClose={() => this.handleClose(item)}
                                     color={COLOR_ARR[Math.floor(Math.random()*COLOR_ARR.length)]} className="author_introduce_tag">
                            {isLongTag ? `${item.slice(0, 20)}...` : item}</Tag>
                    return isLongTag ? <Tooltip title={item} key={item}>{tagElem}</Tooltip> : tagElem;
                })
            }
            </Row>
            <Row className="author_introduce_tag">
                {this.state.tagsOP.inputVisible && (
                  <Input
                    ref={this.saveTagInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={this.state.tagsOP.inputValue}
                    onChange={this.handleTagInputChange}
                    onBlur={this.handleTagInputConfirm}
                    onPressEnter={this.handleTagInputConfirm}
                  />
                )}
                {!this.state.tagsOP.inputVisible && (
                  <Tag
                    onClick={this.showTagInput}
                    style={{ background: '#FFF0F5', borderStyle: 'dashed' }}
                  >
                    <Icon type="plus" />   添加
                  </Tag>
                )}
            </Row>
        </div>
    </div>)}
    componentDidMount(){
        this.getUserId()
    }
    getUserId=()=>{
        get(this.props.userUrl+"/selfid/").then(result=>result.json()).then(result=>{
            if(result.status)
            {

                this.setState({userid:result.data})
                this.getIntroduce(result.data)
            }
        }).catch(function(e){
            console.log( e);
        })
    }
    getIntroduce=(userid)=>{
        //获取introduce内容
        get(this.props.introduceUrl+"/"+userid).then(result=>result.json()).then(result=>{
            if(result.status)
            {
                let state = this.state;
                state.resumeOP.resume = result.data.resume;
                state.tagsOP.tags=result.data.tags.split(" ");
                this.setState(state)
            }
        }).catch(function(e){
            console.log( e);
        })
    }
}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(IntroduceCom)