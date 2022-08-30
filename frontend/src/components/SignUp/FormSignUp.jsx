import { FaLock, FaEnvelope, FaUserCircle, FaAddressCard } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../../assets/white-logo-single.png'

const FormSignUp = (props) => {
    return (
        <form onSubmit={props.Suscribe} className="form">
            <div className="logo-container">
                <img className="logo-login" alt="Logo Groupomania" src={logo} />
                <h3 className="login-text">Inscription</h3>
            </div>
            <div className="input-container">
                <div className="pseudo-container"></div>
                <label htmlFor="name">
                    <FaUserCircle className="user-icon" />
                    Name
                </label>
                <br />
                <input
                    className="input"
                    type="text"
                    placeholder=" Name"
                    name="name"
                    onChange={(e) => props.setName(e.target.value)}
                />
                <br />
                <div className="email-container"></div>
                <label htmlFor="email">
                    <FaEnvelope className="password-icon" />
                    Email
                    {props.emailErr && (
                        <p className="error-message">email non valide</p>
                    )}
                </label>
                <br />
                <input
                    className="input"
                    type="email"
                    placeholder=" email"
                    name="email"
                    onChange={(e) => props.setEmail(e.target.value)}
                />
                <br />
                <div className="password-container">
                    <label htmlFor="password">
                        <FaLock className="password-icon" />
                        Mot de passe
                        {/* {pwdError && (
                                <p className="error-message">
                                    mot de passe non valide
                                </p>
                            )} */}
                    </label>
                    <br />
                    <input
                        className="input"
                        type="password"
                        placeholder=" Mot de passe"
                        name="password"
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                </div>
                <div className="job-container">
                    <label htmlFor="job">
                        <FaAddressCard className="job-icon" />
                        Job
                    </label>

                    <br />
                    <input
                        className="input"
                        type="text"
                        placeholder=" Job"
                        name="job"
                        onChange={(e) => props.setJob(e.target.value)}
                    />
                </div>
            </div>
            <p>{props.error}</p>
            <button className="submit" type="submit">
                Inscription
            </button>

            <div className="back-home-page">
                <p> Revenir à la </p>
                <Link to="/" className="link">
                    page d'acceuil
                </Link>
            </div>
        </form>
    )
}

export default FormSignUp
