import React, { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Home from './Pages/Home'
import Forum from './Pages/Forum'
import SignUp from './Pages/SignUp'
import Profil from './Pages/Profil'
import Users from './Pages/Users'

const App = () => {
    const requestOptions = {
        Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('userData')).token,
    }

    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [myProfil, setMyProfil] = useState([])
    const [comments, setComments] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // Récupération de tout les messages
        fetch('http://localhost:3100/api/messages', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setMessages(data)
            })
        // Recupération de tout les users
        fetch('http://localhost:3100/api/auth/users', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
            })
        fetch(
            //Récuperation des infos de l'utilisateur
            'http://localhost:3100/api/auth/profil/' +
                JSON.parse(localStorage.getItem('userData')).userId,
            requestOptions
        )
            .then((res) => res.json())
            .then((data) => {
                setMyProfil(data)
                setIsLoaded(false)
            })
        fetch(
            //Récuperation des commentaires
            'http://localhost:3100/api/comments',
            requestOptions
        )
            .then((res) => res.json())
            .then((data) => {
                setComments(data)
                setIsLoaded(false)
            })
        setIsLoaded(!isLoaded)
    }, [])

    // if (!isLoaded) {
    //     return <div>Veuillez Patientez...</div>
    // } else {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/forum"
                    element={
                        <Forum
                            users={users}
                            messages={messages}
                            myProfil={myProfil}
                            comments={comments}
                        />
                    }
                />
                <Route
                    path="/profil"
                    element={<Profil myProfil={myProfil} />}
                />
                <Route path="/users" element={<Users users={users} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
