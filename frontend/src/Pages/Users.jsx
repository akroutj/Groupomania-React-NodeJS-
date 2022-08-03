import React from 'react'
import Header from '../components/Header/Header'
import UsersList from '../components/Users/Users'

function Users(props) {
    return (
        <>
            <Header />
            <UsersList users={props.users} />
        </>
    )
}

export default Users
