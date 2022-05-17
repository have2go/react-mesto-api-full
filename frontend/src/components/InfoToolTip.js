import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

function InfoToolTip(props) {
    return (
        <div className={`popup popup__tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className="popup__content_tooltip">
                    <button
                        className="popup__close-btn"
                        onClick={props.onClose}
                        id={`popup__tooltip-btn`}
                        type="button"
                    ></button>
                    {props.isSuccess ? (
                        <>
                            <img
                                src={`${successImage}`}
                                alt="Регистрация прошла успешно."
                                className="popup__tooltip_image"
                            />
                            <p className="popup__title_tooltip">Вы успешно зарегистрировались!</p>
                        </>
                    ) : (
                        <>
                            <img
                                src={`${failImage}`}
                                alt="Регистрация не была выполнена."
                                className="popup__tooltip_image"
                            />
                            <p className="popup__title_tooltip">Что-то пошло не так. Попробуйте ещё раз!</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InfoToolTip;
