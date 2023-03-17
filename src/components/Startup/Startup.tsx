import { easeInOut, motion } from 'framer-motion'
import NanoImg from '/src/assets/Nano-logo-dark.svg'
import StartupNav from './StartupNav'
import Statistics from './Statistics'
import { useEffect, useState } from 'react'
import BasicButton from '../common/Button'
import { LayerOne } from './LayerOne'
import { LayerTwo } from './LayerTwo'
import { LayerThree } from './LayerThree'
import { LayerFour } from './LayerFour'


const Startup = () => {
  return (
    <div className='font-[Nunito] relative'>
        <StartupNav />
        <LayerOne />
        <LayerTwo />
        <LayerThree />
        <LayerFour />
    </div>
  )
}

export default Startup