import { useState } from 'react'
import { app } from '../../firebase/firebase-config'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import AuthorizingPages from '../common/AuthorizingPages'
import user from '/src/assets/registerUser.svg'
import bg from '/src/assets/registerBG.svg'

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
        .catch((err) => {
          console.log(err.code)
          switch (err.code) {
              case 'auth/email-already-in-use':
                toast.error('That email is already in use')
                break
              case 'auth/invalid-email':
                toast.error('That email is invalid. Try again')
                break
              case 'auth/weak-password':
                toast.error('That password is too weak. Try again')
          }
        })
    }

    const login = () => {
      navigate('/login')
    }

  return (
    <div className='w-full flex md:flex-row flex-col-reverse items-center '>
      <AuthorizingPages handleSide={login} type={1} bg={bg} user={user} msg={"It's free."} handleFormSubmit={register} setEmail={setEmail} setPassword={setPassword}/>
      <ToastContainer />
    </div>
  )
}

export default Register