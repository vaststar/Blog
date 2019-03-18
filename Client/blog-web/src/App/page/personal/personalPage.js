import React, { Component } from 'react'
import Header from '../../Common/Header'

import PersonalPageCom from '../../Components/personalPageCom/personalPageCom'

class PersonalPage extends Component {
    render() {
        return (
            <div>
                <Header/> 
                <div className="personal_setting_Com">
                <PersonalPageCom />    
                </div>           
            </div>
        )
    }

}
  
export default PersonalPage