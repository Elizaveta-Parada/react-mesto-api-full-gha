import { React, useContext, useEffect, useState } from "react"
import PopupWithForm from "./PopupWithForm"
import CurrentUserContext from "../contexts/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState(currentUser.name)
    const [description, setDescription] = useState(currentUser.about)

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ profileName: name, profileJob: description });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);


    return (
        <PopupWithForm
            name='popup_profile'
            title='Редактировать профиль'
            nameButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__field">
                <input className="popup__input popup__input_type_name" type="text" placeholder="Имя" name="profileName" id="profile_name"
                    value={name || ''} required minLength={2} maxLength={40} onChange={handleChangeName} />
                <span className="popup__error" id="profile_name-error"></span>
            </div>
            <div className="popup__field">
                <input className="popup__input popup__input_type_job" type="text" placeholder="О себе" name="profileJob" id="profile_job"
                    value={description || ''} minLength={2} maxLength={200} required onChange={handleChangeDescription} />
                <span className="popup__error" id="profile_job-error"></span>
            </div>
        </PopupWithForm>)
}

export default EditProfilePopup