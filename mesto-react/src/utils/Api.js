class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _promiseReject(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`);
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._promiseReject);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._promiseReject);
  }

  editProfileData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._promiseReject);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._promiseReject);
  }

  deleteCard(id) {
    // debugger
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._promiseReject);
  }

  addLike(id) {
    // debugger
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._promiseReject);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._promiseReject);
  }

  changeAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._promiseReject);
  };
}

// экземпляр класса для работы с удаленным сервером
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-45", // ссылка на бэкенд
  headers: {
    authorization: "96f24a59-2446-45e8-8a79-9c1dd75cac85",
    "Content-Type": "application/json",
  },
});

export default api;