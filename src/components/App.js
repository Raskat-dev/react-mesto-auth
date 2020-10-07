import React from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import { userApi } from "../utils/userApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState({
    confirm: null,
    isOpen: false,
  });

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleLogin() {
    setLoggedIn(true);
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      userApi
        .getCurrentUser()
        .then((res) => {
          if (res) {
            // const email = res.data.email;
            setCurrentUser(res.data);
            console.log(res.data);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function onRegister({ password, email }) {
    return userApi
      .register(password, email)
      .then(() => setIsInfoTooltipOpen({ confirm: true, isOpen: true }))
      .then(() => history.push("/sign-in"))
      .catch(() => setIsInfoTooltipOpen({ confirm: false, isOpen: true }));
  }

  function onLogin({ password, email }) {
    return userApi
      .authorization(password, email)
      .then((res) => {
        if (res.token) {
          handleLogin();
          history.push("/");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => console.log(err));
  }

  function onSignOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  function closeInfoPopup() {
    setIsInfoTooltipOpen({ ...isInfoTooltipOpen, isOpen: false });
  }

  function handleUpdateUser(user) {
    userApi
      .changeProfileInfo(user)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about
        });
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  function handleUpdateAvatar(user) {
    userApi
      .changeProfileAvatar(user)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          avatar: res.avatar
        });
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-up">
            <Header>
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            </Header>
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Header>
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </Header>
            <Login onLogin={onLogin} />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            currentUser={currentUser}
            component={Main}
            onSignOut={onSignOut}
            onUpdateUser={handleUpdateUser}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <Route>
            <p className="not-found">Страница не найдена</p>
          </Route>
        </Switch>
        <InfoTooltip
          isInfoTooltipOpen={isInfoTooltipOpen}
          onClose={closeInfoPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
