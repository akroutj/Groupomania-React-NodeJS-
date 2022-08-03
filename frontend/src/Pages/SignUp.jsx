import RedLogo from '../assets/white-logo.png'
import SignUpComp from '../components/SignUp/SignUp'
import '../styles/Home.css'

function SignUp() {
    return (
        <>
            <div className="home-container">
                <div className="home-form-container">
                    <SignUpComp />
                </div>
                <div className="home-image-container">
                    <img className="red-logo" alt="" src={RedLogo} />
                </div>
            </div>
        </>
    )
}

export default SignUp
