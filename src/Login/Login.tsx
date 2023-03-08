import React from 'react'
import Form from '../components/common/Form'
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const login = () => {
        console.log('login')
    }

  return (
    <div>
        <Form title='Login' setEmail={setEmail} setPassword={setPassword} handleForm={login}/>
    </div>
  )
}

export default Login