import React from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = user;
    onLogin({ password, email });
  }

  return (
    <div className="sign">
      <h3 className="sign__title">Вход</h3>
      <form
        className="sign__form"
        method="post"
        action="#"
        onSubmit={handleSubmit}
      >
        <input
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          className="sign__input"
        />
        <input
          id="password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="sign__input"
        />
        <button type="submit" className="sign__button">
          Войти
        </button>
      </form>
      <Link to="/sign-up" className="sign__link">
        Еще не зарегистрированы? Регистрация
      </Link>
    </div>
  );
}

export default Login;
