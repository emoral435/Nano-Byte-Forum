import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BasicButton from './Button';
import { getAuth, signInAnonymously } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase/firebase-config';
import OffSiteAuths from './offSiteAuths';

interface FormProps {
  title: string,
  sideTitle: string,
  handleForm(): any,
  handleSide(): any,
  setEmail(value: string): any,
  setPassword(value: string): any
}

const Form = ({title, sideTitle, handleForm, handleSide, setEmail, setPassword} : FormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
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

  return (
    <Box component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off">
        <div className='flex flex-col items-start gap-6'>
            <h3 className='text-2xl text-[#5c5c5c] w-full flex justify-start'>{title} Form</h3>
            <TextField id='email' label='Email' variant='outlined' sx={{ width: '45ch' }} color='secondary' onChange={(e) => setEmail(e.target.value)} />
            <FormControl sx={{ width: '45ch' }} variant="outlined" color='secondary'>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
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
            <OffSiteAuths />
        </div>
    </Box>
  )
}

export default Form