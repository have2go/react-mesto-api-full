import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';
import * as Auth from '../utils/Auth';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const location = useLocation();

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({
        name: '',
        link: '',
        _id: '',
    });
    const [currentUser, setCurrentUser] = useState({
        name: 'Жак-Ив Кусто',
        about: 'Исследователь океана',
        avatar: '../images/profile-photo.jpg',
    });
    const [cards, setCards] = useState([]);
    const history = useHistory();
    const [email, setEmail] = useState('');

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsTooltipPopupOpen(false);
        setSelectedCard({
            name: '',
            link: '',
            _id: '',
        });
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(
                    cards.filter((element) => {
                        return element._id !== card._id;
                    })
                );
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`));
    }

    function handleUpdateUser(userInfo) {
        setIsLoading(true);
        api.setUserInfo(userInfo)
            .then((updatedUserInfo) => {
                setCurrentUser({
                    name: updatedUserInfo.name,
                    about: updatedUserInfo.about,
                    avatar: updatedUserInfo.avatar,
                    _id: updatedUserInfo._id,
                });
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar(avatarInput) {
        setIsLoading(true);
        return api
            .setUserAvatar(avatarInput.avatar)
            .then((updatedUserInfo) => {
                setCurrentUser({
                    ...currentUser,
                    avatar: updatedUserInfo.avatar,
                });
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit(cardInputs) {
        setIsLoading(true);
        return api
            .postNewCard(cardInputs.name, cardInputs.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleRegisterSubmit(email, password) {
        Auth.register(email, password)
            .then(() => {
                setIsSuccess(true);
                history.push('/sign-in');
            })
            .catch((err) => {
                setIsSuccess(false);
                if (err.status === 400) {
                    console.log('400 - некорректно заполнено одно из полей');
                }
            })
            .finally(() => {
                setIsTooltipPopupOpen(true);
            });
    }

    function handleLoginSubmit(email, password) {
        Auth.login(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
                setEmail(email);
                history.push('/');
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log('400 - не передано одно из полей');
                } else if (err.status === 401) {
                    console.log('401 - пользователь с email не найден');
                }
            });
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sign-in');
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            Auth.checkToken(jwt)
                .then((res) => {
                    setLoggedIn(true);
                    setEmail(res.data.email);
                    history.push('/');
                })
                .catch((err) => {
                    if (err.status === 401) {
                        console.log('401 — Токен не передан или передан не в том формате');
                    }
                    console.log('401 — Переданный токен некорректен');
                });
        }
    }, [history]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header loggedIn={loggedIn} location={location.pathname} email={email} onSignOut={handleSignOut} />

                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Route path="/sign-in">
                        <Login onLogin={handleLoginSubmit} />
                    </Route>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegisterSubmit} />
                    </Route>
                    <Route>{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
                </Switch>

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} isLoading={isLoading} />
                <InfoToolTip isOpen={isTooltipPopupOpen} onClose={closeAllPopups} isSuccess={isSuccess} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
