import { FaTrashAlt } from 'react-icons/fa'

const MessageCardHeader = (props) => {
    return (
        <div className="card-header" key={props.message._id}>
            <div className="identity-card">
                <div>
                    <img
                        className="identity-photo"
                        src={
                            props.users.profilImage !== null
                                ? props.users.length !== 0 &&
                                  props.users.filter(
                                      (user) =>
                                          user._id === props.message.userId
                                  ).length !== 0 &&
                                  props.users.filter(
                                      (user) =>
                                          user._id === props.message.userId
                                  )[0].profilImage
                                : require('../../../src/assets/red-logo-single.png')
                        }
                        alt={
                            props.users.length !== 0 &&
                            props.users.filter(
                                (user) => user._id === props.message.userId
                            ).length !== 0 &&
                            props.users.filter(
                                (user) => user._id === props.message.userId
                            )[0].name + ' photo de profil'
                        }
                    />
                </div>
                <div className="identity-name-and-job">
                    <h2 className="user-name">
                        {props.users.length !== 0 &&
                            props.users.filter(
                                (user) => user._id === props.message.userId
                            ).length !== 0 &&
                            props.users.filter(
                                (user) => user._id === props.message.userId
                            )[0].name}
                    </h2>

                    <p className="user-job">
                        {props.users.length !== 0 &&
                            props.users.filter(
                                (user) => user._id === props.message.userId
                            ).length !== 0 &&
                            props.users.filter(
                                (user) => user._id === props.message.userId
                            )[0].job}
                    </p>
                </div>
            </div>
            <div>
                {JSON.parse(localStorage.getItem('userData')).userId ===
                    props.message.userId || props.myProfil.admin === true ? (
                    <div>
                        <FaTrashAlt
                            className="delete-icon"
                            onClick={(e) => {
                                const confirm = window.confirm(
                                    'Etes-vous sûres de vouloir supprimer ce post ?'
                                )
                                if (confirm === true)
                                    props.deleteOneMessage(e, props.message._id)
                            }}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default MessageCardHeader
