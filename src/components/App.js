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
import Loader from "./Loader";

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState({
    confirm: null,
    isOpen: false,
    error: "",
  });

  const [onLoad, setOnLoad] = React.useState(true);

  React.useEffect(() => {
    setOnLoad(true);
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      userApi
        .getCurrentUser()
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
            history.push("/");
            setOnLoad(false);
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
      .then((res) =>
        res
          ? setIsInfoTooltipOpen({ confirm: true, isOpen: true })
          : setIsInfoTooltipOpen({ confirm: false, isOpen: true })
      )
      .then(() => history.push("/sign-in"))
      .catch((err) => {
        setIsInfoTooltipOpen({
          confirm: false,
          isOpen: true,
          error: err.message,
        });
      });
  }

  function onLogin({ password, email }) {
    return userApi
      .authorization(password, email)
      .then((res) => {
        if (res) {
          userApi.getUser(res.id).then((res) => {
            setCurrentUser(res);
            setLoggedIn(true);
            history.push("/");
          });
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen({
          confirm: false,
          isOpen: true,
          error: err.message,
        });
      });
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
          about: res.about,
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
          avatar: res.avatar,
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
              {onLoad && <Loader />}
              {!onLoad && <Register onRegister={onRegister} />}
            </Route>
            <Route path="/sign-in">
              <Header>
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              </Header>
              {onLoad && <Loader />}
              {!onLoad && <Login onLogin={onLogin} />}
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
            error={isInfoTooltipOpen.error}
          />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
