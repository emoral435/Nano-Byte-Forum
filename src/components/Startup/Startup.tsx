import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useRef } from 'react'
import NanoImg from '/src/assets/Nano_logo.png'

const LayerOne = () => {
    return (
        <>
            <h1 className='text-xl md:text-3xl lg:text-7xl font-bold flex items-center gap-2 select-none text-[#4384d0]'>
                <div>Nano</div>
                <img src={NanoImg} alt="Nano Byte Logo" className='w-20 h-16'/>
                <div>Byte</div>
            </h1>
            <div>Join the worlds fastest growing community.</div>
            <div>With channels varying from cooking all the way to hiking, there is something for you here.</div>
        </>
    )
}

const Startup = () => {
    const ref = useRef()

  return (
    <div className='font-[Nunito]'>
        <Parallax pages={2} className="grid-auto-fit">
            <ParallaxLayer speed={3} offset={0} >
                <LayerOne />
            </ParallaxLayer>

            <ParallaxLayer offset={1}>
                <h1>werwer</h1>
            </ParallaxLayer>
        </Parallax>
    </div>
  )
}

export default Startup