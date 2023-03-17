import { useState, useEffect } from "react"
import BasicButton from "../common/Button"
import { useNavigate } from "react-router-dom"

export const LayerThree = () => {
    const [welcome, setWelcome] = useState(localStorage.getItem('welcome') ? "Welcome back." : "Create an account or login.")
    const navigate = useNavigate()

    const handleBtn = (navLink: string) => {navigate(navLink)}

    useEffect(() => {
        if (!localStorage.getItem('welcome')) {
            localStorage.setItem('welcome', 'true')
        }
    }, [])

    return (
        <div className='flex flex-col md:flex-row md:justify-start bg-[#b4c6d9] p-12 shadow-inner select-none'>
            <div className="flex flex-col items-start">
                <h2 className='text-4xl md:text-5xl text-[#333333]'>We think the best things are free.</h2>
                <h2 className='text-2xl text-[#5c5c5c]'>Thats why it's free to sign up.</h2>
            </div>
            <div className='flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-12 w-full h-full mt-4 md:mt-12'>
                <h2 className='text-4xl text-[#333333]'>{welcome}</h2>
                <BasicButton text='Login' handleClick={() => handleBtn('/login')}/>
                <BasicButton text='Sign Up' handleClick={() => handleBtn('/register')}/>
            </div>
        </div>
    )
}