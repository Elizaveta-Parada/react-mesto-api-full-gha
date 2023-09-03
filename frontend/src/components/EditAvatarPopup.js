import { useEffect, useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: avatarRef.current.value });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            name='popup_avatar'
            title='Обновить аватар'
            nameButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__field">
                <input className="popup__input popup__input_type_avatar" type="url" placeholder="Ссылка" name="avatar" id="avatar"
                    ref={avatarRef} required />
                <span className="popup__error" id="avatar-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup