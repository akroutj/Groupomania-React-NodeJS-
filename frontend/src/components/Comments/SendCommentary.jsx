//Poster un commentaire : REFACTORING ?
const sendCommentary = (e, message, props) => {
    const formData = {
        commentary: props.commentary,
        userId: JSON.parse(localStorage.getItem('userData')).userId,
        messageId: message._id,
        name: props.myProfil.name,
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer ' + JSON.parse(localStorage.getItem('userData')).token,
        },
        body: JSON.stringify(formData),
    }
    fetch('http://localhost:3100/api/comments', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error.message))
}

export default sendCommentary
