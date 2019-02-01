import {Route} from 'react-router-dom'
import Login from './page/login/login'
import HomePage from './page/home/home'

export default [
    { path: "/", name: "App", component: HomePage ,auth:true},
    { path: "/login", name: "Login", component: Login },
]

