const UserData = {
    user:JSON.parse(window.localStorage.getItem('user'))||{
        username:'',
        password:'',
        remember:false
    },
    token:window.localStorage.getItem('token'),
    userUrl:"/rest/users",
    articleUrl:"/rest/articles",
    fileUrl:"/rest/files",
    commentUrl:"/rest/comments",
    likeUrl:"/rest/likes",
    browserUrl:"/rest/browsers",
    introduceUrl:"/rest/introduces",
    validcodeUrl:"/rest/validcodes",
    valid:window.sessionStorage.getItem('valid') ==='true'
}

export const UpdateUser = "changeUser";
export const changeUser = (data)=>({
    type:UpdateUser,
    data
});

export const UpdateToken = 'changeToken';
export const changeToken = (data)=>({
    type:UpdateToken,
    data
});

export const UpdateLoginState = 'changeValid';
export const changeValid = (data)=>({
    type:UpdateLoginState,
    data
});

export const userReducer = (state=UserData,action)=>{
    if (typeof state === 'undefined') {
      return UserData
    }
    switch (action.type) {
        case UpdateUser:
            window.localStorage.setItem('user',JSON.stringify(action.data))
            return {...state,user:action.data};
        case UpdateToken:
            window.localStorage.setItem('token',action.data)
            return {...state,token:action.data};
        case UpdateLoginState:
            window.sessionStorage.setItem('valid',action.data?'true':'false')
            return {...state,valid:action.data};
        default:
            return {...state};
    }
}
