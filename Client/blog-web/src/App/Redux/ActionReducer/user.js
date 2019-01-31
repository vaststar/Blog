const UserData = {
    user:{
        username:'ttt',
        password:'uu',
        remember:true
    },
    token:null
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
        // console.log('lala',state.user,action)
            return {...state,user:action.data};
        case UpdateToken:
            return {...state,token:action.data};
        default:
            return {...state};
    }
}