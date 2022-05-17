import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, ...props }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `elements__trash ${isOwn ? 'elements__trash_visible' : 'elements__trash_hidden'}`;

    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `elements__like ${isLiked ? 'elements__like_active' : 'elements__like_inactive'}`;

    function handleClick() {
        props.onCardClick(card);
    }

    function handleLikeClick() {
        props.onCardLike(card);
    }

    function handleDeleteClick() {
        props.onCardDelete(card);
    }

    return (
        <div className="elements__card">
            <img onClick={handleClick} className="elements__image" src={card.link} alt={card.name} />
            <div className="elements__info">
                <h3 className="elements__title">{card.name}</h3>
                <div className="elements__like-container">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
                    <span className="elements__like-counter">{card.likes.length}</span>
                </div>
            </div>
            <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button"></button>
        </div>
    );
}

export default Card;
