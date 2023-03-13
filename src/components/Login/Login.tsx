import React from 'react'
import Form from '../common/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '../../firebase/firebase-config'

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

  return (
    <div>
        <Form title='Login' setEmail={setEmail} setPassword={setPassword} handleForm={login}/>
    </div>
  )
}

export default Login