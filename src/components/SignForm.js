import React from "react";

function SignForm(props) {
  const {
    handleSubmit,
    user,
    errors,
    handlePasswordChange,
    handleEmailChange,
    isFormValid,
    buttonName,
    formName
  } = props;

  return (
    <div className="sign">
      <h3 className="sign__title">{formName}</h3>
      <form
        className="sign__form"
        method="post"
        action="#"
        onSubmit={handleSubmit}
      >
        <label className="sign__label">
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleEmailChange}
            placeholder="Email"
            className={
              errors.emailError
                ? "sign__input sign__input_error"
                : "sign__input"
            }
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <span
            className={
              errors.emailError
                ? "sign__error sign__error_active"
                : "sign__error"
            }
            id="email-error"
          >
            {errors.emailError}
          </span>
        </label>
        <label className="sign__label">
          <input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={handlePasswordChange}
            placeholder="Пароль"
            className={
              errors.passwordError
                ? "sign__input sign__input_error"
                : "sign__input"
            }
            minLength="6"
            maxLength="30"
            required
          />
          <span
            className={
              errors.passwordError
                ? "sign__error sign__error_active"
                : "sign__error"
            }
            id="password-error"
          >
            {errors.passwordError}
          </span>
        </label>
        <button
          type="submit"
          className={
            isFormValid ? "sign__button" : "sign__button sign__button_disabled"
          }
          disabled={!isFormValid}
        >
          {buttonName}
        </button>
      </form>
      {props.children}
    </div>
  );
}

export default SignForm;
