const base_url = "https://auth.nomoreparties.co";

function resolveCheck(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
    return fetch(base_url + "/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }).then(resolveCheck);
};

export const login = (email, password) => {
    return fetch(base_url + "/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(resolveCheck)
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                return data;
            }
        });
};

export const checkToken = (jwt) => {
    return fetch(base_url + "/users/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    }).then(resolveCheck);
};
