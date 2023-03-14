import BasicButton from '../common/Button'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { motion, useCycle } from 'framer-motion'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './Sidebar';


const StartupNav = () => {
    const navigate = useNavigate()
    const [open, cycleOpen] = useCycle(false, true);


    const handleClick = (string: string) => {
        navigate(string)
    }

  return (
    <>
        <nav className='w-full h-20 border-[4px] border-white bg-[#0a293b] border-b-blue-400 flex justify-center md:justify-between items-center sticky top-0 z-10'>
            <div className='md:hidden absolute right-4'>
                <IconButton
                    size="large"
                    edge="start"
                    color='info'
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => cycleOpen()}
                  >
                    <MenuIcon />
                </IconButton>
            </div>
            <Link to='/'>
                <motion.h2 whileHover={{ scale: 1.1}} className='text-white text-3xl ml-4'>Nano Byte</motion.h2>
            </Link>
            <div className='gap-4 mr-4 md:flex hidden'>
                <BasicButton text="Login" handleClick={() => handleClick('/login')} />
                <BasicButton text="Sign Up" handleClick={() => handleClick('/register')} />
                <BasicButton text="About Us" handleClick={() => handleClick('/about')} />
            </div>
        </nav>
        <div className='h-full sticky top-20 z-10'>
            <div className='flex justify-end'>
                <SideBar open={open}/>
            </div>
        </div>
    </>
  )
}

export default StartupNav