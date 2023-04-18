import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BasicButton from './Button';
import { getAuth, signInAnonymously, sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase/firebase-config';
import OffSiteAuths from './offSiteAuths';
import { easeInOut, motion } from 'framer-motion';
import Button from '@mui/material/Button'
import { ToastContainer, toast } from 'react-toastify'

interface FormProps {
  title: string,
  sideTitle: string,
  handleForm(): any,
  handleSide(): any,
  setEmail(value: string): any,
  setPassword(value: string): any
}

const Form = ({title, sideTitle, handleForm, handleSide, setEmail, setPassword} : FormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('')
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleAnon = () => {
    const auth = getAuth(app);
    signInAnonymously(auth)
    .then((response) => {
        console.log('what')
        navigate('/home')
        sessionStorage.setItem('login token', response.user.uid)
        sessionStorage.setItem('anon', 'true')
      })
      .catch((err) => {
        console.log(err.code)
      })
  }

  const handleForgot = () => {
    const auth = getAuth(app)
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        console.log('hooray, email got sent')
      }).catch((err) => {
        console.log(err.code)
        switch (err.code) {
          case 'auth/invalid-email':
              toast.error('That email is invalid. Try again')
              break
          case 'auth/missing-email':
              toast.error('Email input is empty. Try again')
              break
          case 'auth/user-not-found':
              toast.error('Email not linked with an account. Try again')
              break
        }
      })
  }

  const clickedForC = () => {
    const container = document.getElementById('reset')
    const forgot = document.getElementById('forgot')
    console.log('whaat')
    if (container != null && forgot != null) {
      container.classList.toggle('hidden')
      forgot.classList.toggle('hidden')
    }
  }
  

  const handleSubmit = (e: any) => {
    if (e.code === "Enter") {
      handleForm()
    }
  }
  return (
    <Box component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off">
        <div className='flex flex-col items-start gap-6'>
            <h3 className='text-2xl text-[#5c5c5c] w-full flex justify-start'>{title}</h3>
            <TextField id='email' label='Email' variant='outlined' sx={{ width: '45ch' }} color='secondary' onChange={(e) => setEmail(e.target.value)} />
            <FormControl sx={{ width: '45ch' }} variant="outlined" color='secondary'>
              <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
              <OutlinedInput
                onKeyDown={handleSubmit}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <div className='flex justify-start w-full gap-5'>
              <BasicButton text={title} handleClick={handleForm}/>
              <BasicButton text={sideTitle} handleClick={handleSide}/>
              <BasicButton text='Anonymous Sign In' handleClick={handleAnon} />
            </div>
            <motion.button id='forgot' type='button' onClick={clickedForC} whileHover={{ scale: 1.05 }} className='w-full flex justify-center text-sm text-[#1a73e8]'>Forgot Password?</motion.button>
            <motion.div animate={{transition: easeInOut}}  id='reset' className="hidden">
                <div className='flex justify-center gap-4 my-4'>
                  <motion.button type='button' onClick={clickedForC} whileHover={{ scale: 1.05 }} className='text-sm text-[#1a73e8]'>Cancel</motion.button>
                  <TextField size='small' id='reset-input' label='Enter Email Used' variant='outlined' sx={{ width: '20ch' }} color='secondary' onChange={(e) => setResetEmail(e.target.value)}/>
                  <Button type='button' onClick={handleForgot}>SEND RESET EMAIL</Button>
                </div>
            </motion.div>
            <OffSiteAuths />
        </div>
    </Box>
  )
}

export default Form