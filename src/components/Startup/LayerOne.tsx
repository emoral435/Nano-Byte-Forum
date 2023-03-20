import OTP from '/src/assets/OTP.jpg'
import { motion } from 'framer-motion'
import NanoImg from '/src/assets/Nano-logo-dark.svg'

export const LayerOne = () => {
    return (
        <>
            <h1 className='font-["Georgia"] flex flex-col-reverse items-center justify-center md:flex-row md:justify-around md:items-center select-none text-[#333333] h-[40vh] w-full bg-stone-300'>
                <div className='flex gap-12 justify-center items-start flex-col m-4'>
                    <div className="flex justify-center md:text-7xl text-6xl">
                        <div>Nano</div>
                        <motion.div className={'w-20 h-16 relative'} whileHover={{scale: 1.2}}>
                            <img src={NanoImg} alt="Nano Byte Logo" className='w-full h-full absolute top-2'/>
                        </motion.div>
                        <div>Byte</div>
                    </div>
                    <div className='flex justify-start flex-row md:flex-col gap-2 md:gap-0'>
                        <p className='hidden md:flex text-2xl md:text-3xl text-[#5c5c5c]'>Join the worlds fastest</p>
                        <p className='hidden md:flex text-2xl md:text-3xl text-[#5c5c5c]'>growing community.</p>
                        <p className='md:hidden text-2xl md:text-3xl text-[#5c5c5c]'>Join the worlds fastest growing community.</p>
                    </div>
                </div>
                <div className='flex justify-center overflow-hidden shadow-2xl'>
                    <img src={OTP} alt="Woman On Phone" className='hidden md:block object-cover md:h-[56rem] md:mt-64 hover:scale-100 scale-[120%] transition ease-in-out duration-200'/>
                </div>
            </h1>
            <div className='flex flex-col items-center'>
            </div>
        </>
    )
}