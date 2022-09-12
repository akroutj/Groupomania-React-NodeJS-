import RedLogo from '../assets/white-logo.png'
import Login from '../components/Login/Login'
import '../styles/Home.css'

function Home(props) {
    console.log(props)
    return (
        <>
            <div className="home-container">
                <div className="home-form-container">
                    <Login setIsLoaded={props.setIsLoaded} />
                </div>
                <div className="home-image-container">
                    <img
                        className="red-logo"
                        alt="Logo rouge de Groupomania"
                        src={RedLogo}
                    />
                </div>
            </div>
        </>
    )
}

export default Home
