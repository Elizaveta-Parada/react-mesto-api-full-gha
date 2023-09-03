import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children,  containerSelector}) => {
    // закрытие popup по `Escape`
    useEffect(() => {
        if (!isOpen) return;
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [isOpen, onClose])

    // обработчик оверлея
    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    // внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`. 
    return (
        <div
            className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
            onClick={handleOverlay}
        >
            {/* добавляем контейнер для контента попапа с возможностью изменения типа, чтобы ImagePopup можно было сделать с другими размерами */}
            <div className={containerSelector}>
                <button
                    className='popup__close'
                    type='button'
                    onClick={onClose}
                />
                {/* тут может быть любой контент попапа в `children`: хоть для попапа картинки, хоть для `InfoToolTip`, 
        хоть для `PopupWithForm` */}
                {children}
            </div>
        </div>
    );
};

export default Popup;

