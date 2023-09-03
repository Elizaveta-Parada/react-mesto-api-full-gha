import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';



function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState("")

    const [infoTooltip, setInfoTooltip] = useState(false)
    const [succesInfoTooltip, setSuccesInfoTooltip] = useState(false)
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt')


    useEffect(() => {
        if (isLoggedIn) {
        Promise.all([api.getUserInfo(jwt), api.getCards(jwt)])
            .then(([dataUserInfo, dataCard]) => {
                setCurrentUser(dataUserInfo)
                setCards(dataCard)
            })
            .catch((error) => { console.log(`Ошибка при загрузке страницы ${error}`) })}
    }, [isLoggedIn, jwt])

    // Проверка токена и авторизация пользователя

    function authCheck(jwt) {
        auth.checkToken(jwt)
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setEmail(res.email);
                }
            })
            .catch((error) => { console.log(`Ошибка авторизации ${error}`) })
    }

    useEffect(() => {
        if (jwt) {
            authCheck(jwt)
        }

    }, [jwt])

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        } 
    }, [isLoggedIn, navigate])

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(null)
        setInfoTooltip(false)

    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api
            .changeLikeCardStatus(card._id, isLiked, jwt)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((error) => { console.log(`Ошибка при проставлении лайка ${error}`) })
    }

    function handleCardDelete(cardId) {
        api
            .deleteImage(cardId, jwt)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== cardId));
            })
            .catch((error) => { console.log(`Ошибка при при удалении фото ${error}`) })
    }

    function handleUpdateUser(dataUserInfo) {
        api
            .setUserInfo(dataUserInfo, jwt)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((error) => { console.log(`Ошибка при редактировании профиля ${error}`) })

    }

    function handleUpdateAvatar(dataUserInfo) {
        api
            .setAvatar(dataUserInfo, jwt)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((error) => { console.log(`Ошибка при загрузки фото ${error}`) })
    }

    function handleAddPlaceSubmit(dataCard) {
        api
            .addNewCard(dataCard, jwt)
            .then((res) => {
                setCards([res, ...cards])
                closeAllPopups()
            })
            .catch((error) => { console.log(`Ошибка при загрузки фото ${error}`) })

    }

    function handleLoginSubmit(email, password) {
        auth
            .login(email, password)
            .then((res) => {
                if (!res || res.status === 400) throw new Error("Неверное имя пользователя или пароль");
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    setIsLoggedIn(true);
                    setEmail(email)
                    navigate('/')
                }
            })
            .catch((error) => {
                console.error(error.message || "Что-то пошло не так");
            });
    }

    function handleRegisterSubmit(email, password) {
        auth
            .register(email, password)
            .then(() => {
                setSuccesInfoTooltip(true)
                setInfoTooltip(true)
                navigate('/sign-in')
            })
            .catch((error) => {
                console.error(`ошибка при регистрации ${error}`);
                setSuccesInfoTooltip(false);
                setInfoTooltip(true);
            })

    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setEmail("")
        navigate('/sign-in');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <Header
                    isLoggedIn={isLoggedIn}
                    email={email}
                    onSignOut={handleSignOut}
                />
                <Routes>
                    <Route path='/' element={
                        <ProtectedRoute
                            isLoggedIn={isLoggedIn}
                            component={Main}
                            cards={cards}
                            onEditProfile={handleEditProfileClick}
                            onEditAvatar={handleEditAvatarClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete} />}
                    />
                    <Route path='/sign-in' element={<Login onLogin={handleLoginSubmit} />} />
                    <Route path='/sign-up' element={<Register onRegister={handleRegisterSubmit} />} />
                    <Route path='*' element={
                        isLoggedIn ? (
                            <Navigate to="/" replace />
                        ) : (
                            <Navigate to="/sign-in" replace />)} />
                </Routes>
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <PopupWithForm
                    name='popup_delete'
                    title='Вы уверены?'
                    nameButton='Да'
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    isOpen={infoTooltip}
                    onClose={closeAllPopups}
                    isSuccess={succesInfoTooltip}
                />
            </div>
        </CurrentUserContext.Provider >
    );
}

export default App;
