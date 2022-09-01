import { FaTrashAlt } from 'react-icons/fa'
const MessageCardHeader = (props) => {
    console.log(props.users)
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
                        alt="Visage de la personne"
                    />
                </div>
                <div className="identity-name-and-job">
                    <h3 className="user-name">
                        {props.users.length !== 0 &&
                            props.users.filter(
                                (user) => user._id === props.message.userId
                            ).length !== 0 &&
                            props.users.filter(
                                (user) => user._id === props.message.userId
                            )[0].name}
                    </h3>

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
                props.message.userId ? (
                    <FaTrashAlt
                        className="delete-icon"
                        onClick={(e) =>
                            props.deleteOneMessage(e, props.message._id)
                        }
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default MessageCardHeader
