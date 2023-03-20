import React from 'react'
import Form from '../common/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '../../firebase/firebase-config'
import { LayerFour } from '../Startup/LayerFour'
import user from '/src/assets/loginUser.svg'
import bg from '/src/assets/loginBackground.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          .catch((err) => {
            console.log(err)
            switch (err.code) {
              case 'auth/wrong-password':
                toast.error('Please retry entering in your password')
                break
              case 'auth/user-not-found':
                toast.error('User not found, please try entering your email')
                break
              case 'auth/invalid-email':
                toast.error('Invalid email')
                case 'auth/internal-error':
                  toast.error('Please retry entering your login credentials')
            }
          })
    }

    const signUp = () => {
      navigate('/register')
    }

  return (
    <div className='w-full flex md:flex-row flex-col-reverse items-center '>
      <div className='w-[35rem] xl:flex hidden bg-[#3f3d56] xl:h-[100vh] items-center' >
        <img src={bg} alt="login background" className=''/>
      </div>
      <div className='w-full h-[100vh] bg-[#ebf3f9] flex flex-col justify-center items-center lg:items-start'>
        <div className='flex flex-col shadow-xl sm:p-12 py-12 lg:ml-10 xl:ml-20 bg-white gap-20 md:scale-100 scale-75'>
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
      <ToastContainer />
    </div>
  )
}

export default Login