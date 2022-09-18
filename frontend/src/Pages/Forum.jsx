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
    }, [])

    return (
        <>
            {messages ? (
                <>
                    <Header />

                    <main className="forum-container">
                        <div className="title-forum-container">
                            <h1 className="title-forum">Fil d'actualité</h1>
                        </div>
                        <PostMessage myProfil={props.myProfil} />

                        <AllMessages
                            setMessages={setMessages}
                            messages={messages}
                            users={props.users}
                            myProfil={props.myProfil}
                            comments={props.comments}
                        />
                    </main>
                </>
            ) : null}
        </>
    )
}

export default Forum
