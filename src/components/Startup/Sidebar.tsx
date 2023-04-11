import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BasicButton from "../common/Button";

const links = [
    { name: "Login", to: "/login", id: 1},
    {name: "Sign Up", to: "/register", id: 2,},
]

const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 }
  };
  
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      }
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1
      }
    }
  };

interface Props {
    open: boolean
}

const SideBar = ({ open } : Props) => {
    const navigate = useNavigate()

    const handleClick = (str: string) => {navigate(str)}


    return (
        <AnimatePresence >
            {open && <motion.aside  animate={{ width: "25%", paddingBottom: 16, paddingTop: 16}} exit={{ transition: { delay: 0.7, duration: 0.3, ease: 'easeInOut' }}} className="md:hidden">
                <motion.div initial="closed" animate="open" variants={sideVariants} exit="closed" className="flex gap-2 justify-around items-center">
                    {links.map(({name, to, id}) => (
                        <motion.a key={id + " sidebar link"} variants={itemVariants} whileHover={{ scale: 1.1}} className="text-2xl">
                            <BasicButton text={name} handleClick={() => handleClick(to)} />
                        </motion.a>
                    ))}
                </motion.div>
            </motion.aside>}
        </AnimatePresence>
    )
}

export default SideBar