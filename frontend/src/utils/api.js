class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt");

    return {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Erro: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    const url = `${this._baseUrl}/users/me`;
    const body = { name, about };

    console.log("[PROFILE 4] iniciando fetch PATCH", {
      url,
      body,
      hasToken: Boolean(localStorage.getItem("jwt")),
    });

    return fetch(url, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    })
      .then((res) => {
        res
          .clone()
          .text()
          .then((responseBody) => {
            console.log("[PROFILE 5] resposta HTTP recebida", {
              status: res.status,
              ok: res.ok,
              responseBody,
            });
          });

        return res;
      })
      .then(this._checkResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }

  addCard({ name, link }) {
    const url = `${this._baseUrl}/cards`;
    const body = { name, link };

    console.log("[CARD 4] iniciando fetch POST", {
      url,
      body,
      hasToken: Boolean(localStorage.getItem("jwt")),
    });

    return fetch(url, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    })
      .then((res) => {
        res
          .clone()
          .text()
          .then((responseBody) => {
            console.log("[CARD 5] resposta HTTP recebida", {
              status: res.status,
              ok: res.ok,
              responseBody,
            });
          });

        return res;
      })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://34.10.168.10:3000",
});

export default api;
