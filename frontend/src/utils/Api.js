class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _resolveCheck(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(this._baseUrl + "/users/me", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this._token,
            },
        }).then(this._resolveCheck);
    }

    getInitialCards() {
        return fetch(this._baseUrl + "/cards", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this._token,
            },
        }).then(this._resolveCheck);
    }

    setUserInfo(data) {
        return fetch(this._baseUrl + "/users/me", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: this._token,
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._resolveCheck);
    }

    postNewCard(name, link) {
        return fetch(this._baseUrl + "/cards", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: this._token,
            },
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        }).then(this._resolveCheck);
    }

    deleteCard(_id) {
        return fetch(this._baseUrl + `/cards/${_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: this._token,
            },
        }).then(this._resolveCheck);
    }

    changeLikeCardStatus(_id, isLiked) {
        return fetch(this._baseUrl + `/cards/${_id}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: this._token
            },
        }).then(this._resolveCheck);
    }

    setUserAvatar(link) {
        return fetch(this._baseUrl + "/users/me/avatar", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: this._token
            },
            body: JSON.stringify({
                avatar: link,
            }),
        }).then(this._resolveCheck);
    }
    setToken(token) {
        localStorage.setItem('jwt', token);
        this._token = token;
      }

}

const api = new Api({
    baseUrl: "https://api.ad.mesto.students.nomoreparties.sbs",
});

export default api;
