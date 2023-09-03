import React, { useContext } from 'react'
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext';


function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-area">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Фото" />
                    <button type="button" className="profile__avatar-edit" aria-label="Редактировать аватар профиля"
                        onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__info-title">{currentUser.name}</h1>
                    <p className="profile__info-subtitle">{currentUser.about}</p>
                    <button type="button" className="profile__edit-button" aria-label="Редактировать профиль"
                        onClick={onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-button" aria-label="Добавить фото" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__lists">
                    {cards.map(data => {
                        return (
                            <li key={data._id}>
                                <Card card={data} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                            </li>)
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;