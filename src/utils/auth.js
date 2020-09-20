export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    if (res.status !== 400) {
      return res.json();
    }
    throw new Error('Некорректно заполнено одно из полей');
  })
};

export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
      if (res.status === 200){
        return res.json();
      }
      if (res.status === 400){
        throw new Error('Не передано одно из полей');
      }
      if (res.status === 401){
        throw new Error('Пользователь с таким email не найден');
      }
    })
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    } else {
      return;
    }
  })
  .catch((err) => {
    console.log(err)
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    if (res.status === 200){
      return res.json();
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
}
