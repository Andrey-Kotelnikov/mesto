class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  }

  getItems() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then(this._checkStatus)
  }
  
  createItem({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkStatus)
  }
  
  deleteItem(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._checkStatus)
  }
  
  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(this._checkStatus)
  }
  
  editProfile({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkStatus)
  }
  
  editAvatar ({avatar}) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkStatus)
  }
  
  getAvatar() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(this._checkStatus)
  }
  
  like(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(this._checkStatus)
  }
  
  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._checkStatus)
  }
}
  
  
  
  /*
   // в index.js
  
  getItems()
    .then((res) => {
      console.log(res)
      res.forEach((item) => {
        const newCard = createCard(item)
        cardList.addItemAppend(newCard)
      })
      
    })
    .catch((err) => {
      console.log(err);
    })
  
  getProfile()
    .then((res) => {
      profileInfo.setUserInfo({name: res.name, about: res.about})
    })
  
  
  getAvatar()
    .then((res) => {
      profileInfo.setAvatar({avatar: res.avatar})
    })
    
  like('647a14a4cef3b70748d19644')
  
  //deleteLike('647a14a4cef3b70748d19644')
  
    fetch('https://nomoreparties.co/v1/cohort-66/users/me', {
    headers: {
      authorization: 'f10f5a64-3064-497a-969f-575534cc1185'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    }); 
}*/

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'f10f5a64-3064-497a-969f-575534cc1185',
    'Content-Type': 'application/json'
  }
});