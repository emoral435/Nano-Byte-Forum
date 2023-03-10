import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    // NOTE we will use this to help us know if the user have been to this page before. If they have not ever since they closed the browser or are new, they will be redirected 
    // to the login page
    useEffect(() => {
        let auth = sessionStorage.getItem('login token')
        if (auth) {
            navigate('/home')
        } else {
            navigate('/login')
        }

    }, [])

  return (
    <div>Home screen</div>
  )
}

export default Home