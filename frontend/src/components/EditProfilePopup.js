import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser(values);
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser);
        }
    }, [currentUser, props.isOpen, resetForm]);

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isValid={!isValid}
        >
            <input
                id="popup__name-input"
                type="text"
                placeholder="Имя"
                value={values.name || ''}
                onChange={handleChange}
                className="popup__input popup__input_type_name"
                name="name"
                required
                minLength="2"
                maxLength="40"
            />
            <span className="popup__input-error popup__name-input-error">{errors.name}</span>
            <input
                id="popup__about-input"
                type="text"
                placeholder="О себе"
                value={values.about || ''}
                onChange={handleChange}
                className="popup__input popup__input_type_about"
                name="about"
                required
                minLength="2"
                maxLength="200"
            />
            <span className="popup__input-error popup__about-input-error">{errors.about}</span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
