//Из-за особенностей верстки я пока не использую тут и в InfoToolTip компонент Popup, но обязательно переделаю как будет свободное время, чтобы везде использовался Popup.
//Как и валидацию для Login и Register. Принцип работы понятен, спасибо!

function ImagePopup(props) {
    return (
        <div className={`popup img-popup ${props.card.name !== '' ? 'popup_opened' : ''}`}>
            <div className="img-popup__content">
                <img src={props.card.link} alt={props.card.name} className="img-popup__element" />
                <h3 className="img-popup__text">{props.card.name}</h3>
                <button
                    onClick={props.onClose}
                    className="popup__close-btn img-popup__close-btn"
                    type="button"
                ></button>
            </div>
        </div>
    );
}

export default ImagePopup;