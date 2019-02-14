import Login from './page/login/login'
import HomePage from './page/home/home'
import VideoPage from './page/home/video'
import RegisterPage from './page/register/register'
import ArticlePage from './page/article/articlePage'

export default [
    { path: "/", name: "App", component: HomePage ,auth:false},
    { path: "/login/", name: "Login", component: Login },
    { path: "/video/", name: "Vedio", component: VideoPage ,auth:true},
    { path: "/register/", name: "Register", component: RegisterPage ,auth:false},
    { path:"/articles/:id", name:"Articles",component:ArticlePage,auth:false}
]

