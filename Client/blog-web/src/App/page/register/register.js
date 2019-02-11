import React,{ Component } from 'react'
import {connect} from 'react-redux'
import { withRouter ,Redirect} from 'react-router-dom'

class Register extends Component {
    render() {
        return (
            <div>register</div>
        );
    }
}

const  RegisterPage =  withRouter(Register)
export default RegisterPage