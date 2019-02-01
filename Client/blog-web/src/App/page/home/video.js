import React, { Component } from 'react'
import vv from '../../static/2.mp4'
import ii from '../../static/1.png'

class VideoPage extends Component {
    render() {
        return (
            <div>
            {/* <object data="../../static/1.avi" type="video/avi" />  */}
            <video src={vv} type="video/mp4" controls></video>
            <img src={ii}></img>
            </div> 
        )
    }
}

export default VideoPage