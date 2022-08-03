import React from 'react'
import Header from '../components/Header/Header'

import PostMessage from '../components/PostMessage/PostMessage'
import AllMessages from '../components/AllMessages/AllMessages'

import '../styles/Forum.css'

function Forum(props) {
    return (
        <>
            <Header />
            <div className="forum-container">
                <PostMessage myProfil={props.myProfil} />
                <AllMessages
                    messages={props.messages}
                    users={props.users}
                    myProfil={props.myProfil}
                />
            </div>
        </>
    )
}

export default Forum
