import React from 'react'
import './Users.css'

function UsersList(props) {
    return (
        <div className="users-container">
            {props.users.length !== 0 &&
                props.users.map((user, index) => (
                    <div className="users-card" key={index}>
                        <div className="user-photo">
                            <img
                                className="identity-photo"
                                src="https://dev.identite.photos/wp-content/uploads/2018/01/photo-identit%C3%A9-pr%C3%A9fectures-300x300.jpg"
                                alt=""
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
