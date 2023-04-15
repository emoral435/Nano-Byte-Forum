import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimarySearchAppBar from './HomeNav'
import HomeContent from './HomeContent'
import defaultProfile from '/src/assets/profileCircle.svg'
import { ProfileProvider } from '../../context/ProfileContext'
import { auth, db } from '../../firebase/firebase-config'
import { setDoc, doc } from 'firebase/firestore'

const Home = () => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState<string>(defaultProfile)

    // NOTE we will use this to help us know if the user have been to this page before. If they have not ever since they closed the browser or are new, they will be redirected 
    // to the login page

    useEffect(() => { // NOTE check if the user is logged in, else kick them back to the login screen
        let storage = sessionStorage.getItem('login token')
        if (!storage) {
          navigate('/login')
        }
        async () => {
          const userUpdate = await updateProfile(auth.currentUser!, {
            displayName: auth.currentUser!.email?.substring(0, auth.currentUser!.email.indexOf('@')),
            photoURL: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          })
        }
        const unsub = onAuthStateChanged(auth, async (user) => {
          await setDoc(doc(db, "users", user!.uid), {
            uid: user!.uid,
            displayName: user!.displayName,
            email: user!.email,
            photoURL: user!.photoURL
          })
          const chatLogRef = doc(db, 'userChats', user!.uid)
          await setDoc(chatLogRef, {}, {merge: true})
        })
        return unsub()
    }, [])

    useEffect(() => {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user && user.photoURL) {
          setProfile(user.photoURL)
        }
      })
    }, [])

  return (
    <ProfileProvider>
      <div className='h-screen flex flex-col bg-[#dae0e6] justify-start'>
        <div>
          <PrimarySearchAppBar imgUrl={profile}/>
        </div>
        <HomeContent />
      </div>
    </ProfileProvider>
  )
}

export default Home