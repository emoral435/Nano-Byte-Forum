import BasicButton from "./Button"
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider, GithubAuthProvider, updateProfile } from 'firebase/auth';
import { ref } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";
import { app, auth, storage, db } from "../../firebase/firebase-config";



const OffSiteAuths = () => {
    const navigate = useNavigate()
    
    const success = async (type: string, response: any) => {
        sessionStorage.setItem('login token', type + ' token')
        const user = response.user
        const userUpdate = await updateProfile(auth.currentUser!, {
            displayName: user.email?.substring(0, user.email.indexOf('@')),
            photoURL: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        })
        const currUser = auth.currentUser
        sessionStorage.setItem("offsite token", currUser!.uid)
        // await setDoc(doc(db, "users", currUser!.uid), {
        //     uid: currUser!.uid,
        //     displayName: currUser!.displayName,
        //     email: currUser!.email,
        //     photoURL: currUser!.photoURL
        // })

        await setDoc(doc(db, 'userChats', currUser!.uid), {})
    }
    
    const handleGoogleAuth = () => {
        handleAuth('google')
    }
    
    const handleGithubAuth = () => {
        handleAuth('github')
    }

    const handleAuth = (type: string) => {
        console.log(type)
        const provider = (type == 'github') ? new GithubAuthProvider : new GoogleAuthProvider
        const auth = getAuth();
        sessionStorage.setItem("info", JSON.stringify(auth.currentUser))
        signInWithRedirect(auth, provider)
        getRedirectResult(auth)
            .then((result: any) => {
                console.log(result)
                success(type, result)
                console.log("success")
                navigate('/home')
            }).catch((err) => { 
                console.log(err.code)
            })
    }

  return (
    <div className="w-full text-[#5c5c5c] flex flex-col gap-4">
        <div className="w-full flex justify-center items-center" id="continue-with">
            <span className="mx-4">Or continue with</span>
        </div>
        <div className="w-full flex justify-around">
            <Button color='primary' size='large' variant='contained' className="whitespace-nowrap" sx={{paddingLeft: 8, paddingRight: 8}} onClick={handleGoogleAuth} >
                <GoogleIcon />
            </ Button>
            <Button color='primary' size='large' variant='contained' className="whitespace-nowrap" sx={{paddingLeft: 8, paddingRight: 8}} onClick={handleGithubAuth}>
                <GitHubIcon />
            </ Button>
        </div>
    </div>
  )
}

export default OffSiteAuths