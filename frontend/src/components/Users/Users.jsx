import React from 'react'
import './Users.css'
import { FaStar } from 'react-icons/fa'

function UsersList(props) {
    return (
        <div className="users-container">
            <div className="users-title-text-container">
                <h1 className="users-title-text">Utilisateurs</h1>
            </div>
            {props.users.length !== 0 &&
                props.users.map((user, index) => (
                    <div className="users-card" key={index}>
                        <div className="user-photo">
                            <img
                                className="identity-photo"
                                src={
                                    user.profilImage !== null
                                        ? user.profilImage
                                        : require('../../../src/assets/red-logo-single.png')
                                }
                                alt={'Photo de profil ' + user.name}
                            />
                        </div>
                        <div className="name-card">
                            <h2 className="name-user">{user.name}</h2>
                            <p className="job-user">{user.job}</p>
                        </div>
                        <div>
                            {user.admin === true && (
                                <div className="admin-users-container">
                                    <FaStar className="star-icon" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default UsersList
