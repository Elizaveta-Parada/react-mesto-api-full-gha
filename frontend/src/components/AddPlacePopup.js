
import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name: title, link: link });
    }

    useEffect(() => {
        setTitle("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm
            name='popup_card'
            title='Новое место'
            nameButton='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__field">
                <input className="popup__input popup__input_type_title " type="text" placeholder="Название" name="title" id="title"
                    minLength={2} maxLength={30} required value={title || ""} onChange={handleChangeTitle} />
                <span className="popup__error" id="title-error"></span>
            </div>
            <div className="popup__field">
                <input className="popup__input popup__input_type_image" type="url" placeholder="Ссылка" name="link" id="url"
                    required value={link || ""} onChange={handleChangeLink} />
                <span className="popup__error" id="url-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup