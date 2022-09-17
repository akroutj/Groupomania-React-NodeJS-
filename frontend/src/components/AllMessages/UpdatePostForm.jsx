import { FaRegCheckCircle, FaCamera } from 'react-icons/fa'

const UpdatePostForm = (props) => {
    return (
        <form
            className="form-update-post"
            onSubmit={(e) => props.updatePost(e, props.message._id)}
        >
            {props.updatePostImg === null && (
                <label className="update-image-post-label">
                    <input
                        className="input-change-photo"
                        type="file"
                        name="update-image-icon"
                        onChange={(e) => {
                            props.setUpdatePostImg(e.target.files)
                        }}
                    />
                    <FaCamera className="modify-photo-icon" />
                    Changer de photo
                </label>
            )}
            {props.updatePostImg !== null && (
                <div className="success-upload-container-post">
                    <FaRegCheckCircle className="success-logo" />
                    <p> Image upload avec succès </p>
                    <button onClick={(e) => props.setUpdatePostImg(null)}>
                        Annuler{' '}
                    </button>
                    <div className="change-photo-bouton">
                        <input
                            type="submit"
                            className="post-button"
                            value="Sauvegarder"
                        />
                    </div>
                </div>
            )}

            <label htmlFor="update-description" className="update-description">
                <input
                    aria-label="labelUpdateDescription"
                    className="input-update-description"
                    type="text"
                    placeholder="    Changer la description"
                    name="update-description"
                    onChange={(e) => {
                        props.setUpdatePostDescription(e.target.value)
                    }}
                />
                Votre description
            </label>
        </form>
    )
}

export default UpdatePostForm
