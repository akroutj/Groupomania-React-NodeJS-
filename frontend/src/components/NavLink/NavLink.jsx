import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavLink.css'
import { FaPowerOff, FaBars, FaTimes } from 'react-icons/fa'
import { userLogout } from '../../utils/toasts'

function NavLink() {
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(true)

    let user = 'Bearer' + JSON.parse(localStorage.getItem('userData'))

    function Logout() {
        localStorage.clear(user)
        navigate('/')
        userLogout()
    }

    return (
        <>
            <div className="navigation">
                <button
                    className="burger-icon"
                    onClick={() => setIsMobile(!isMobile)}
                >
                    {isMobile ? <FaBars /> : <FaTimes />}
                </button>

                <div
                    className={
                        isMobile
                            ? 'navigation-links'
                            : 'navigation-links-mobile'
                    }
                    onClick={() => setIsMobile(false)}
                >
                    <Link className="navlink" to="/Forum">
                        Fil d'actualité
                    </Link>
                    <Link className="navlink" to="/Profil">
                        Profil
                    </Link>
                    <Link className="navlink" to="/Users">
                        Utilisateurs
                    </Link>
                </div>

                <FaPowerOff onClick={Logout} className="profil-icon" />
            </div>
        </>
    )
}

export default NavLink
