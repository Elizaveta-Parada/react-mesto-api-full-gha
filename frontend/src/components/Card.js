import { useContext } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext)
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__icon ${isLiked && 'element__icon-active'}`
    );

    function handleCardClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleCardDelete() {
        onCardDelete(card._id)
    }

    return (
        <article className="element">
            <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            {isOwn && <button type="button" className="element__delete" aria-label="Удалить" onClick={handleCardDelete} />}
            <div className="element__group">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-area">
                    <button type="button" className={cardLikeButtonClassName} aria-label="Лайк" onClick={handleLikeClick} />
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card