import { FaLock, FaEnvelope } from 'react-icons/fa'

const FormLogin = (props) => {
    return (
        <form onSubmit={props.LoginValidation} className="form">
            <div className="email-container"></div>
            <label htmlFor="email">
                <FaEnvelope className="login-form-icon" />
                Email
            </label>
            <br />
            <input
                aria-label="labelTextEmail"
                aria-required="true"
                id="email"
                className="input"
                type="email"
                placeholder="email"
                name="email"
                onChange={(e) => props.setEmail(e.target.value)}
            />
            <br />
            <div className="password-container">
                <label htmlFor="password">
                    <FaLock className="login-form-icon" />
                    Mot de passe
                </label>
                <br />
                <input
                    aria-label="labelTextPassword"
                    aria-required="true"
                    className="input"
                    id="password"
                    type="password"
                    placeholder=" Mot de passe"
                    name="password"
                    onChange={(e) => props.setPassword(e.target.value)}
                />
            </div>
            <div className="password-validation-container">
                <label htmlFor="password-validation">
                    <FaLock className="login-form-icon" />
                    Confirmez le mot de passe
                </label>
                <br />
                <input
                    aria-label="labelTextConfirmationPassword"
                    aria-required="true"
                    className="input"
                    id="password-validation"
                    type="password"
                    onChange={(e) =>
                        props.setPasswordConfirmation(e.target.value)
                    }
                    placeholder=" Mot de passe"
                    name="password-validation"
                />
            </div>
            <p>{props.error}</p>
            <button className="submit" type="submit">
                Connexion
            </button>
        </form>
    )
}

export default FormLogin
