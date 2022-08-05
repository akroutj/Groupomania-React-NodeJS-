import React from 'react'
import { Link } from 'react-router-dom'
import './NavLink.css'
import { FaPowerOff } from 'react-icons/fa'

function NavLink() {
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
                <Link className="navlink" to="/">
                    <FaPowerOff className="profil-icon" />
                </Link>
            </div>
        </>
    )
}

export default NavLink
