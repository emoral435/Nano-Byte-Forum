import React from 'react'
import Form from '../common/Form'
import { useState, useEffect } from 'react'
import { app } from '../../firebase/firebase-config'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
    // NOTE this is different from logging in, where we most likely want every time a user goes to the register page to make a new account
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const register = async () => {
      console.log('registering...')
      const auth = getAuth(app)
      // NOTE This creates a single instance of a user - there can only be one instance per user email !
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          window.sessionStorage.setItem('login token', response.user.uid)
          navigate('/home')
        })
        // NOTE this will fail if the user already exists
        .catch((error) => {
          const err = error.code
          if (err === 'auth/email-already-in-use') {
            toast.error('This Email is Already in Use, Please Try Another');
          } 
        })
    }

  return (
    <div>
        <Form title='Register' setEmail={setEmail} setPassword={setPassword} handleForm={register}/>
        <ToastContainer />
    </div>
  )
}

export default Register