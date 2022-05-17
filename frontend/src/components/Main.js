import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info-container">
                    <div className="profile__photo" onClick={props.onEditAvatar}>
                        <img src={currentUser.avatar} alt="Фото профиля" className="profile__photo" />
                        <div className="profile__shadow">
                            <div className="profile__avatar-edit-button"></div>
                        </div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__name-and-button">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                                className="profile__edit-button"
                                onClick={props.onEditProfile}
                                type="button"
                            ></button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} type="button"></button>
            </section>

            <section className="elements">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;
