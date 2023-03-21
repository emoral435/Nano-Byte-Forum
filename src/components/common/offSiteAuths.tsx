import BasicButton from "./Button"
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider, GithubAuthProvider, User } from 'firebase/auth';
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebase-config";



const OffSiteAuths = () => {
    const navigate = useNavigate()
    
    const success = (type: string) => {
        sessionStorage.setItem('login token', type + ' token')
        console.log("success")
        navigate('/home')
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
        signInWithRedirect(auth, provider)
        getRedirectResult(auth)
            .then((result: any) => {
                console.log(result)
                success(type)
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