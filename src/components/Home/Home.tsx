import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimarySearchAppBar from '../common/HomeNav/HomeNav'
import HomeContent from './HomeContent'
import defaultProfile from '/src/assets/profileCircle.svg'

const Home = () => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState<string>(defaultProfile)

    // NOTE we will use this to help us know if the user have been to this page before. If they have not ever since they closed the browser or are new, they will be redirected 
    // to the login page

    useEffect(() => { // NOTE check if the user is logged in, else kick them back to the login screen
        let storage = sessionStorage.getItem('login token')
        if (storage) {
            navigate('/home')
        } else {
            navigate('/login')
        }
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
          if (user && user.photoURL) {
            setProfile(user.photoURL)
          }
        })
    }, [])

  return (
    <div className='h-screen flex flex-col bg-[#dae0e6]'>
      <PrimarySearchAppBar imgUrl={profile}/>
      <HomeContent />
    </div>
  )
}

export default Home