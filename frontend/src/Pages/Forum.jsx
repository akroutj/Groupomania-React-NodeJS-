import React, { useState, useEffect } from 'react'
import Header from '../components/Header/Header'

import PostMessage from '../components/PostMessage/PostMessage'
import AllMessages from '../components/AllMessages/AllMessages'

import '../styles/Forum.css'

function Forum(props) {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        setMessages(messages)
    }, [messages])

    useEffect(() => {
        // props.setIsLoaded(true)
        const requestOptions = {
            Authorization:
                'Bearer ' + JSON.parse(localStorage.getItem('userData')).token,
        }
        // Récupération de tout les messages
        fetch('http://localhost:3100/api/messages', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setMessages(data)
            })
        // props.setIsLoaded(false)
    }, [])
    return (
        <>
            {messages ? (
                <>
                    <Header />
                    <div className="forum-container">
                        <PostMessage myProfil={props.myProfil} />

                        <AllMessages
                            setMessages={setMessages}
                            messages={messages}
                            users={props.users}
                            myProfil={props.myProfil}
                            comments={props.comments}
                        />
                    </div>
                </>
            ) : null}
        </>
    )
}

export default Forum
