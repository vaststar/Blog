import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li><NavLink exact to="/">首页</NavLink></li>
                        <li><NavLink to="/author/">个人中心</NavLink></li>
                        <li><NavLink to='/topic/'>话题</NavLink></li>
                        <li><NavLink to="/login/">登录</NavLink></li>
                        <li><NavLink to="/login/">注销</NavLink></li>
                    </ul>
                </nav>
            </header>
        )
    }

    getToken(username,password){
        const url = "http://127.0.0.1:4444/author/token/";
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body:JSON.stringify({'username':'ttt','password':'uuu'})
            
        }).then(response => response.json())
            .then(result => {
                return result;
            // 在此处写获取数据之后的处理逻辑
               console.log(result);
            }).catch(function (e) {
                //console.log("fetch fail", JSON.stringify(params));
            });
    }
}

export default Header