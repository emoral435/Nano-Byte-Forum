import React from 'react'
import Form from '../common/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '../../firebase/firebase-config'
import { LayerFour } from '../Startup/LayerFour'
import user from '/src/assets/loginUser.svg'
import bg from '/src/assets/loginBackground.svg'

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
    <div className='w-full h-full flex md:flex-row flex-col-reverse items-center '>
      <div className='w-[35rem] xl:flex hidden bg-[#3f3d56] h-[100vh] items-center' >
        <img src={bg} alt="login background" className=''/>
      </div>
      <div className='w-full h-[100vh] bg-[#ebf3f9] flex flex-col justify-center items-center lg:items-start'>
        <div className='flex flex-col shadow-xl p-12 lg:ml-10 xl:ml-20 bg-white gap-20'>
          <div className='flex md:flex-row flex-col-reverse gap-8'>
            <div>
              <h1 className='text-7xl text-[#333333] mb-6' >Welcome Back.</h1>
              <Form title='Login' sideTitle='Sign Up' setEmail={setEmail} setPassword={setPassword} handleForm={login} handleSide={signUp}/>
            </div>
            <img src={user} alt="login user" className='md:h-full h-[10rem]' />
          </div>
          <div className='flex justify-center'>
            <LayerFour />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login