const UserData = {
    // user:{
        username:'888',
        password:'1',
        remember:true

    // }
}

export const UpdateUser = "changeUser";
export const changeUser = (data)=>({
    type:UpdateUser,
    data
});

export const userReducer = (state=UserData,action)=>{
    if (typeof state === 'undefined') {
      return UserData
    }
    switch (action.type) {
        case UpdateUser:
        console.log('lala',state.user,action)
            return {...state,...action.data};
        default:
            return {...state};
    }
}