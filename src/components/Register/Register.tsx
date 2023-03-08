import React from 'react'
import Form from '../common/Form'
import { useState } from 'react'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const register = () => {
        console.log('register')
    }

  return (
    <div>
        <Form title='Register' setEmail={setEmail} setPassword={setPassword} handleForm={register}/>
    </div>
  )
}

export default Register