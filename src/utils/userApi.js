import { myApiData } from "./utils";
const token = localStorage.getItem("token");

class Api {
  constructor(options) {
    this._url = options.url;
  }

  register(password, email) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      if (res.status === 409) {
        throw new Error("Пользователь с таким email уже зарегистрирован")
      }
      if (res.status !== 400) {
        return res.json();
      }
      throw new Error("Некорректно заполнено одно из полей");
    });
  }

  authorization(password, email) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password, email }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 400) {
          throw new Error("Не передано одно из полей");
        }
        if (res.status === 401) {
          throw new Error("Неправильный логин или пароль");
        }
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        } else {
          return;
        }
      })
  }

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  getUser(id) {
    return fetch(`${this._url}/users/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  changeProfileInfo(user) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }
  //изменение аватара пользователя
  changeProfileAvatar(user) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: user.avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }
}

export const userApi = new Api(myApiData);
