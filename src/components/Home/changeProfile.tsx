import BasicButton from "../common/Button"
import { useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { upload } from "../../firebase/firebase-config"
import { motion } from "framer-motion"
import uploadImg from '/src/assets/upload.svg'

const ChangeProfile = () => {
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleInput = (e: any) => {
       if ( e.target.files[0]) {
        setPhoto(e.target.files[0])
       }
    }

    const handleUpload = () => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
          if (user) {
            upload(photo, user, setLoading)
          }
        })
    }
  return (

    <div className="flex flex-col justify-center items-center gap-8">
        <motion.label whileHover={{scale: 1.05, backgroundColor: "#cccccc"}} htmlFor="file-upload" className="text-3xl font-['Georgia'] rounded-full p-4"><img src={uploadImg} className="w-20 h-20"/></motion.label>
        <input id="file-upload" type="file" onChange={handleInput} className="hidden" accept=".jpeg,.jpg,.png,.webp,.svg" />
        <button disabled={loading || !photo} onClick={handleUpload} className="bg-[#cccccc] hover:bg-[#ccccccd6] hover:cursor-pointer border-2 border-[#607d8b] text-xl font-['Georgia'] px-2 py-2 rounded-[10px]">
            Upload File
        </button>
    </div> 
  )
}

export default ChangeProfile