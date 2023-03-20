import BasicButton from "./Button"
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';


const OffSiteAuths = () => {
  return (
    <div className="w-full text-[#5c5c5c]">
        <div className="w-full flex justify-center items-center" id="continue-with">
            <span className="mx-4">Or continue with</span>
        </div>
        <div className="w-full flex justify-around">
            <GoogleIcon />
            <GitHubIcon />
        </div>
    </div>
  )
}

export default OffSiteAuths