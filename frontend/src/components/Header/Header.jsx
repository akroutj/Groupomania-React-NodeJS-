import NavLink from '../NavLink/NavLink'
import logo from '../../assets/white-logo.png'
import './Header.css'

function Header() {
    return (
        <>
            <header className="header-container">
                <img
                    className="header-logo"
                    alt="Logo Groupomania"
                    src={logo}
                />
                <NavLink />
            </header>
        </>
    )
}

export default Header
