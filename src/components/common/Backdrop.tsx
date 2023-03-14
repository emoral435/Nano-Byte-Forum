import { motion } from "framer-motion";

interface Props {
    children: any,
    onClick: any
}

export default function Backdrop({ children, onClick} : Props) {
    return (
        <motion.div onClick={onClick} className="absolute top-0 left-0 h-full w-full bg-[#000000e1] flex justify-end items-start overflow-y-auto max-h-[100%]"
            initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} >
            {children}
        </motion.div>
    )
}