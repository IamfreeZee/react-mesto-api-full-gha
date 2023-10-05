class Authorization {
  constructor ({ baseUrl }) {
    this._url = baseUrl;
  };

  _getResponseData (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
    }
  }

  registration (email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._getResponseData)
  }

  login (email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._getResponseData)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token)
        return data
      }
    })
  }

  getToken (token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._getResponseData)
  }

}

// создание экземпляра класса
const authorization = new Authorization({
  baseUrl: 'https://api.freezee.nomoredomainsrocks.ru' // старый адрес для запросов 'https://auth.nomoreparties.co'
});

export { authorization }