import Popup from "./Popup";

function PopupWithForm({ name, title, nameButton, children, isOpen, onClose, onSubmit }) {
    return (
        <Popup
            name={name}
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            containerSelector='popup__container'
        >
            <h2 className="popup__title">{title}</h2>
            <form className="popup__form" onSubmit={onSubmit}>
                {children}
                <button type="submit" className="popup__submit-btn popup__submit-btn_visable">{nameButton}</button> 
            </form>
        </Popup>
    );
}

export default PopupWithForm