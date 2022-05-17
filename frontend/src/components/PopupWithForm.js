import Popup from './Popup';

function PopupWithForm({ isOpen, name, onClose, ...props }) {
    return (
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <button className="popup__close-btn" onClick={onClose} id={`${name}-btn`} type="button"></button>
            <h2 className="popup__title">{props.title}</h2>
            <form
                action="#"
                onSubmit={props.onSubmit}
                name={`${name}-form`}
                className="popup__form"
                id={`${name}-form`}
            >
                {props.children}
                <button className="popup__save-btn" type="submit">
                    {props.buttonText}
                </button>
            </form>
        </Popup>
    );
}

export default PopupWithForm;
