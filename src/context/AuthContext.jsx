import { children } from 'react'
import { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{
    /* Aca manejen todas las funcionalidades relacionadas al usuario y auth */
    let isAuthenticatedInitialState = localStorage.getItem('authorization_token')
    const [isAuthenticatedState, setIsAutheticatedState] = useState(isAuthenticatedInitialState)
    useEffect(
        () =>{
            const token = localStorage.getItem('authorization_token')
            if(token){
                setIsAutheticatedState(true)
            }
        },
        []
    )
    const logout = () =>{
        localStorage.removeItem('authorization_token')
        setIsAutheticatedState(false)
    }

    const login = (authorization_token) => {
        localStorage.setItem('authorization_token', authorization_token)
        setIsAutheticatedState(true)
    }
    return (
        <AuthContext.Provider value={{isAuthenticatedState, logout, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider