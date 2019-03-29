import LoginPage from './page/login/LoginPage'
import HomePage from './page/home/home'
import AuthorPage from './page/author/authorPage'
import RegisterPage from './page/register/registerPage'
import ArticlePage from './page/article/articlePage'
import WriteArticlePage from './page/writeArticle/writeArticlePage'
import PersonalPage from './page/personal/personalPage'

export default [
    { path: "/", name: "App", component: HomePage ,auth:false},
    { path: "/login/", name: "Login", component: LoginPage },
    { path: "/author/:id?", name: "Authors", component: AuthorPage},
    { path: "/register/", name: "Register", component: RegisterPage ,auth:false},
    { path:"/articles/:id", name:"Articles",component:ArticlePage,auth:false},
    { path:"/writes/", name:"Writers",component:WriteArticlePage,auth:true},
    { path:"/personal/", name:"Personal",component:PersonalPage,auth:true}
]

