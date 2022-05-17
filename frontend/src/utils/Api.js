class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = options.headers.authorization;
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
                authorization: this._token,
            },
        }).then(this._resolveCheck);
    }

    getInitialCards() {
        return fetch(this._baseUrl + "/cards", {
            headers: {
                authorization: this._token,
            },
        }).then(this._resolveCheck);
    }

    setUserInfo(data) {
        return fetch(this._baseUrl + "/users/me", {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
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
                authorization: this._token,
                "Content-Type": "application/json",
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
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(this._resolveCheck);
    }

    changeLikeCardStatus(_id, isLiked) {
        return fetch(this._baseUrl + `/cards/likes/${_id}`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(this._resolveCheck);
    }

    setUserAvatar(link) {
        return fetch(this._baseUrl + "/users/me/avatar", {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: link,
            }),
        }).then(this._resolveCheck);
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-28",
    headers: {
        authorization: "fbabf2a1-b60d-4ec5-acf1-d3bcd274680a",
        "Content-Type": "application/json",
    },
});

export default api;
