const UserData = {
    user:JSON.parse(window.localStorage.getItem('user'))||{
        username:'test',
        password:'test',
        remember:true
    },
    token:window.localStorage.getItem('token'),
    valid:false
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
            return {...state,valid:action.data};
        default:
            return {...state};
    }
}