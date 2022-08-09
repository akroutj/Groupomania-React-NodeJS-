import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavLink.css'
import { FaPowerOff } from 'react-icons/fa'

function NavLink() {
    const navigate = useNavigate()
    let user = 'Bearer' + JSON.parse(localStorage.getItem('userData'))
    function Logout() {
        localStorage.clear(user)
        navigate('/')
    }

    return (
        <>
            <div className="navigation">
                <Link className="navlink" to="/Forum">
                    Fil d'actualité
                </Link>
                <Link className="navlink" to="/Profil">
                    Profil
                </Link>
                <Link className="navlink" to="/Users">
                    Utilisateurs
                </Link>

                <FaPowerOff onClick={Logout} className="profil-icon" />
            </div>
        </>
    )
}

export default NavLink
