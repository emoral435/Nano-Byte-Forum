import { useState, createContext, useEffect } from "react";
import auth from '/src/firebase/firebase-config'
import { onAuthStateChanged }from 'firebase/auth'
const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
       const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            console.log(user)
        })

        return () => unsub
    }, [])

    return (
    <AuthContext.Provider value={{ currentUser }}>
        {children}
    </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthContextProvider
}