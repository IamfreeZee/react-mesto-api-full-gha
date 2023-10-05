class Api {
  constructor ({ baseUrl }) {
    this._url = baseUrl;
  };

  _getResponseData (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getUserInfo (token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._getResponseData)
  }

  getInitialCards (token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._getResponseData)
  }

  getData (token) {
    return Promise.all([this.getUserInfo(token), this.getInitialCards(token)])
  }

  setUserInfo (dataObj, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: dataObj.userName,
        about: dataObj.userCaption,
      })
    })
    .then(this._getResponseData)
  }

  setUserAvatar (dataObj, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: dataObj.userAvatar,
      })
    })
    .then(this._getResponseData)
  }

  addNewCard (dataObj, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: dataObj.cardName,
        link: dataObj.cardLink,
      })
    })
    .then(this._getResponseData)
  }

  deleteCard (cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._getResponseData)
  }

  putLike (cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._getResponseData)
  }

  deleteLike (cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._getResponseData)
  }

};

// создание экземпляра класса API
const api = new Api({
  baseUrl: 'https://api.freezee.nomoredomainsrocks.ru'
});

export { api }