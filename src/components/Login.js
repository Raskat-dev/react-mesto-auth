import React from "react";
import { Link } from "react-router-dom";
import SignForm from "./SignForm";

function Login({ onLogin }) {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    emailError: "",
    passwordError: "",
  });

  const [isValid, setIsValid] = React.useState({
    emailIsValid: false,
    passwordIsValid: false,
  });

  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    if (isValid.emailIsValid && isValid.passwordIsValid) setIsFormValid(true);

    return () => {
      setIsFormValid(false);
    };
  }, [isValid.emailIsValid, isValid.passwordIsValid]);

  function handleEmailChange(evt) {
    setUser({
      ...user,
      email: evt.target.value,
    });

    if (!evt.target.validity.valid) {
      setErrors({
        ...errors,
        emailError: evt.target.validationMessage,
      });
      setIsValid({
        ...isValid,
        emailIsValid: false,
      });
    } else {
      setErrors({
        ...errors,
        emailError: "",
      });
      setIsValid({
        ...isValid,
        emailIsValid: true,
      });
    }
  }

  function handlePasswordChange(evt) {
    setUser({
      ...user,
      password: evt.target.value,
    });

    if (!evt.target.validity.valid) {
      setErrors({
        ...errors,
        passwordError: evt.target.validationMessage,
      });
      setIsValid({
        ...isValid,
        passwordIsValid: false,
      });
    } else {
      setErrors({
        ...errors,
        passwordError: "",
      });
      setIsValid({
        ...isValid,
        passwordIsValid: true,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = user;
    if (!email && !password) return;
    onLogin({ password, email });
  }

  return (
    <SignForm
      handleSubmit={handleSubmit}
      user={user}
      errors={errors}
      handlePasswordChange={handlePasswordChange}
      handleEmailChange={handleEmailChange}
      isFormValid={isFormValid}
      buttonName="Войти"
      formName="Вход"
    >
      <Link to="/sign-up" className="sign__link">
        Еще не зарегистрированы? Регистрация
      </Link>
    </SignForm>
  );
}

export default Login;
