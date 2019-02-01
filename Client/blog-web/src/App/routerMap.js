import Login from './page/login/login'
import HomePage from './page/home/home'
import VideoPage from './page/home/video'

export default [
    { path: "/", name: "App", component: HomePage ,auth:true},
    { path: "/login", name: "Login", component: Login },
    { path: "/video", name: "Login", component: VideoPage }
]

