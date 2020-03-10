import React, { createContext,useReducer } from 'react'
import jwtDecode from 'jwt-decode';

if(localStorage.getItem('jwtToken')){
    const decodedToken= jwtDecode


}




const AuthContext = createContext({
    user:null,
    login:(userData)=>{},
    logout:()=>{}
})

const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN' :
            return{
                ...state,
                user:action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user:null
            }
        default:
            return state;
    }
}

const AuthProvider = (props)=>{
    const [state,dispatch]=useReducer(authReducer,{user:null});

    const login = (userData) =>{
        localStorage.setItem("jwtToken",userData.token)
        dispatch({
            type:'LOGIN',
            payload:userData
        })
    }

    const logout = () =>{
        localStorage.removeItem("jwtToken")
        dispatch({type:'LOGOUT'})
    }

    return(
        <AuthContext.Provider
        value={{user:state.user,login,logout}}
        {...props}
        />
    )

}

export {AuthContext,AuthProvider}