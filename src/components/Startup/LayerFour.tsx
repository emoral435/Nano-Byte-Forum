import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { easeInOut, motion } from 'framer-motion';
import NanoImg from '/src/assets/Nano-logo-dark.svg'

export const LayerFour = () => {
    return (
        <div className='w-full bg-[#f5f5f5] h-28 flex flex-col md:flex-row md:justify-center md:items-center md:gap-6 m-4'>
            <div className='flex flex-col gap-6 items-center justify-center'>
                    <div className="flex justify-center gap-6">
                        <motion.a whileHover={{ scale: 1.2, rotate: 360, transition: {duration: .7, delay: .1}}} exit={{transition: {ease: easeInOut}}} href="https://github.com/emoral435" target={'_blank'}>
                            <GitHubIcon color='primary' fontSize='large'/>
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, rotate: 360, transition: {duration: .7, delay: .1}}} exit={{transition: {ease: easeInOut}}} href="https://www.linkedin.com/in/emSWE/" target={'_blank'}>
                            <LinkedInIcon color='primary' fontSize='large'/>
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, rotate: 360, transition: {duration: .7, delay: .1}}} exit={{transition: {ease: easeInOut}}} href="mailto:emoral435@gmail.com?subject=NanoByte">
                            <ForwardToInboxIcon color='primary' fontSize='large'/>
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, rotate: 360, transition: {duration: .7, delay: .1}}} exit={{transition: {ease: easeInOut}} } href="https://github.com/emoral435" target={'_blank'}>
                            <WysiwygIcon color='primary' fontSize='large'/>
                        </motion.a>
                    </div>
                    <div className='flex justify-center items-center font-["Georgia"] gap-1 text-[#333333]'>
                        <h4 className='text-xl'>Nano</h4>
                        <motion.div className={'w-6 h-6'} whileHover={{scale: 1.2}}>
                            <img src={NanoImg} alt="Nano Byte Logo" className=''/>
                        </motion.div>
                        <h4 className='text-xl'>Byte</h4>
                        <div className='flex justify-center items-center'>
                            <CopyrightIcon color='primary' sx={{ fontSize: 15}} />
                        </div>
                        <h4 className='text-[#5c5c5c]'>Nano Byte Media Coorporation 2023</h4>
                    </div>
            </div>
        </div>
    )
}