import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '../../firebase/firebase-config'
import user from '/src/assets/loginUser.svg'
import bg from '/src/assets/loginBackground.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthorizingPages from '../common/AuthorizingPages'

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
      <AuthorizingPages msg={'Welcome Back.'} type={0} bg={bg} user={user} setEmail={setEmail} setPassword={setPassword} handleFormSubmit={login} handleSide={signUp}/>
      <ToastContainer />
    </div>
  )
}

export default Login