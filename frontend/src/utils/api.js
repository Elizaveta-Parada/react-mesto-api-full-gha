class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }
    // Метод обработки ответа с сервера
    _processingResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`код ошибки: ${res.status}`);
        }
    }

    _request(url, options) {
        return fetch(`${this._baseUrl}${url}`, options).then(this._processingResponse);
    }

    // Метод получения данных пользователя с сервера 
    getUserInfo(token) {
        return this._request(`/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    // Метод отправки данных пользователя на сервер
    setUserInfo(data, token) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.profileName, about: data.profileJob })
        })
    }

    // Метод загрузки карточек с сервера
    getCards(token) {
        return this._request(`/cards`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    // Метод отправки данных аватара на сервер 
    setAvatar(data, token) {
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar: data.avatar })
        })
    }

    // Метод добавления новой карточки
    addNewCard({ name, link }, token) {
        return this._request(`/cards`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, link })
        })
    }

    //Метод постановки и удаления лайков
    putLike(cardId, token) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
    }

    deleteLike(cardId, token) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
    }

    changeLikeCardStatus(cardId, isLiked, token) {
        return this._request(`/cards/${cardId}/likes`, {
            method: `${isLiked ? "DELETE" : "PUT"}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
    }

    //Метод удаления фото
    deleteImage(cardId, token) {
        return this._request(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
    }
}

const api = new Api({
    baseUrl: 'http://mesto.backend.nomoredomainsicu.ru',
})

export default api