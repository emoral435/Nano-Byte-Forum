import { useRef } from 'react'
import { motion } from 'framer-motion'
import NanoImg from '/src/assets/Nano_logo.png'
import OTP from '/src/assets/OTP.jpg'
import BasicButton from '../common/Button'
import StartupNav from './StartupNav'

const LayerOne = () => {
    return (
        <>
            <h1 className='relative text-7xl font-bold flex flex-col sm:flex-row justify-between items-center select-none text-[#4384d0] h-1/4 sm:h-[100vh] w-full bg-stone-300'>
                <div className='flex gap-4 m-4'>
                    <div>Nano</div>
                    <motion.div className={'w-20 h-16'} whileHover={{scale: 1.2}}>
                        <img src={NanoImg} alt="Nano Byte Logo" className='w-full h-full'/>
                    </motion.div>
                    <div>Byte</div>
                </div>
            </h1>
            <div className='flex flex-col items-center'>
                <h2 className='text-3xl'>Join the worlds fastest growing community.</h2>
                <h2 className='text-3xl'>With channels varying from cooking all the way to hiking, there is something for you here.</h2>
            </div>
        </>
    )
}

const Startup = () => {
    const ref = useRef()

  return (
    <div className='font-[Nunito] relative'>
        <StartupNav />
        <LayerOne />
    </div>
  )
}

export default Startup