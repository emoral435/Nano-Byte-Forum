import React from 'react'
import Form from './Form'
import { LayerFour } from '../Startup/LayerFour'

interface Props {
    bg: string,
    msg: string,
    type: number,
    setEmail: (email: string) => void ,
    setPassword: (password: string) => void,
    handleFormSubmit(): void,
    handleSide(): void,
    user: string

}

const AuthorizingPages = ({bg, msg, type, setEmail, setPassword, handleFormSubmit, handleSide, user} :Props) => {
    const strType: string = (type == 0) ? 'Login' : 'Sign Up'
    const strSideBtn: string = (type == 0) ? 'Sign Up' : 'Login'


  return (
    <div className='flex md:flex-row flex-col-reverse items-center w-full'>
        <div className='w-[35rem] xl:flex hidden bg-[#3f3d56] xl:h-[100vh] items-center' >
            <img src={bg} alt={strType + " background"} className=''/>
        </div>
        <div className='w-full h-[100vh] bg-[#ebf3f9] flex flex-col justify-center items-center lg:items-start'>
            <div className='flex flex-col shadow-xl sm:p-12 py-12 lg:ml-10 xl:ml-20 bg-white gap-20 md:scale-100 scale-75'>
            <div className='flex md:flex-row flex-col-reverse gap-8'>
                <div>
                <h1 className='text-7xl text-[#333333] mb-6' >{msg}</h1>
                <Form title={strType} sideTitle={strSideBtn} setEmail={setEmail} setPassword={setPassword} handleForm={handleFormSubmit} handleSide={handleSide}/>
                </div>
                <img src={user} alt={strType + " user"} className='md:h-full h-[10rem]' />
            </div>
            <div className='flex justify-center'>
                <LayerFour />
            </div>
            </div>
        </div>
    </div>
  )
}

export default AuthorizingPages