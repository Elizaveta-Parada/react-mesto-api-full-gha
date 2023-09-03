import Popup from "./Popup"

function ImagePopup({ card, onClose }) {
    return (
        <Popup
            onClose={onClose}
            isOpen={card}
            name='full-image'
            containerSelector='popup__container-image'
        >
            <img className="popup__image" src={card?.link} alt={card?.name} />
            <h2 className="popup__title-image">{card?.name}</h2>
        </Popup>
    )
}
export default ImagePopup