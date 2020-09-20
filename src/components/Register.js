import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [newUser, setNewUser] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = newUser;
    onRegister({ password, email })
    setNewUser({email: "", password: ""})
  }

  return (
    <>
      <div className="sign">
        <h3 className="sign__title">Регистрация</h3>
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
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="sign__input"
          />
          <input
            id="password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Пароль"
            className="sign__input"
          />
          <button type="submit" className="sign__button">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="sign__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
