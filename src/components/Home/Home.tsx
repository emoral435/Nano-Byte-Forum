import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimarySearchAppBar from '../common/HomeNav/HomeNav'

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
    <div className='h-full relative bg-[#dae0e6]'>
      <nav className="sticky top-0">
        <PrimarySearchAppBar />
      </nav>
      <main className='h-full w-full flex justify-center items-start'>
        <div className='bg-white w-[35rem] h-[90%] mt-6 mb-6'>
          hello
        </div>
      </main>
    </div>
  )
}

export default Home