import React from 'react'
import Header from '../components/Header/Header'

import PostMessage from '../components/PostMessage/PostMessage'
import AllMessages from '../components/AllMessages/AllMessages'
import { Suspense } from 'react'

import '../styles/Forum.css'

function Forum(props) {
    return (
        <>
            <Header />
            <div className="forum-container">
                <Suspense fallback={<p>coucou</p>}>
                    <PostMessage myProfil={props.myProfil} />
                </Suspense>

                <AllMessages
                    setMessages={props.setMessages}
                    messages={props.messages}
                    users={props.users}
                    myProfil={props.myProfil}
                    comments={props.comments}
                />
            </div>
        </>
    )
}

export default Forum
