import successImage from "../images/successImage.svg"
import fail from "../images/fail.svg"
import Popup from "./Popup"

function InfoTooltip({ name, isOpen, isSuccess, onClose }) {
    return (
        <Popup
            isOpen={isOpen}
            containerSelector='popup__container'
            name='tooltip'
            onClose={onClose}
        >
            <img className="popup__info-tooltip" src={isSuccess ? successImage : fail} alt="Вы успешно зарегистрировались!" />
            <p className="popup__message">{isSuccess
                ? 'Вы успешно зарегистрировались!'
                : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </p>
        </Popup>
    )
}

export default InfoTooltip

