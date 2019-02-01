const UserData = {
    user:{
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

export const userReducer = (state=UserData,action)=>{
    if (typeof state === 'undefined') {
      return UserData
    }
    switch (action.type) {
        case UpdateUser:
            return {...state,user:action.data};
        case UpdateToken:
            window.localStorage.setItem('token',action.data)
            state.valid = action.data != null
            return {...state,token:action.data};
        default:
            return {...state};
    }
}