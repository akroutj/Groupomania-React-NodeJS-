import React from 'react'
import './Users.css'

function UsersList(props) {
    console.log(props.users.name)
    return (
        <div className="users-container">
            {props.users.length !== 0 &&
                props.users.map((user, index) => (
                    <div className="users-card" key={index}>
                        <div className="user-photo">
                            <img
                                className="identity-photo"
                                src={
                                    user.profilImage !== undefined
                                        ? user.profilImage
                                        : require('../../../src/assets/red-logo-single.png')
                                }
                                alt="profil"
                            />
                        </div>
                        <div className="name-card">
                            <h3 className="name-user">{user.name}</h3>
                            <p className="job-user">{user.job}</p>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default UsersList
