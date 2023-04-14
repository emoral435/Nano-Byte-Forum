import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

export const ProfileContext = createContext<any>([])

export const ProfileProvider = ({children} : any) => {
    const [currentPicture, setPicture] = useState<null | string>(null)
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setPicture(user!.photoURL)
        })

        return () => {
            unsub()
        }
    }, [currentPicture])

    return (
        <ProfileContext.Provider value={[currentPicture, setPicture]}>
            {children}
        </ProfileContext.Provider>
    )
}