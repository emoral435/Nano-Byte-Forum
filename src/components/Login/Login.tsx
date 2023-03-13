import Form from '../common/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '../../firebase/firebase-config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
          .catch((error) => {
            const err = error.code
            console.log(err)
            if (err == 'auth/user-not-found') {
              toast.error("Please Retry Putting Your Email In")
            } else if (err == 'auth/wrong-password'){
              toast.error('Invalid Password, Please Retry Putting In Your Password')
            } else if (err == 'auth/invalid-email') {
              toast.error('Please Enter A Valid Email Address')
            } else if (err == 'auth/internal-error') {
              toast.error('Please Enter Password')
            }
          })
    }

  return (
    <div>
        <Form title='Login' setEmail={setEmail} setPassword={setPassword} handleForm={login}/>
        <ToastContainer />
    </div>
  )
}

export default Login