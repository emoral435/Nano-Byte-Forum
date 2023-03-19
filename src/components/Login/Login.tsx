import React from 'react'
import Form from '../common/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '../../firebase/firebase-config'
import { LayerFour } from '../Startup/LayerFour'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const login = () => {
        const auth = getAuth(app)
        signInWithEmailAndPassword(auth, email, password)
          .then((response) => {
            navigate('/home')
            sessionStorage.setItem('login token', response.user.uid)
          })
    }

    const signUp = () => {
      navigate('/register')
    }

  return (
    <div className='w-full h-full flex md:flex-row flex-col'>
      <div className='basis-1/2'>
        {/* <img src={background} alt="background building" className='' /> */}
      </div>
      <div className='w-full h-[100vh] bg-[#ebf3f9] flex justify-start items-center'>
        <div className='flex flex-col  shadow-xl p-12 ml-20 bg-white'>
          <h1 className='text-7xl text-[#333333] mb-6' >Welcome Back.</h1>
          <Form title='Login' sideTitle='Sign Up' setEmail={setEmail} setPassword={setPassword} handleForm={login} handleSide={signUp}/>
        </div>
        <LayerFour />
      </div>
    </div>
  )
}

export default Login