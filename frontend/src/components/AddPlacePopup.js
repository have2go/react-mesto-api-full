import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup(props) {
    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        props
            .onAddPlace({
                name: values.name,
                link: values.link,
            })
            .then(() => {
                setValues({name: '', link: ''});
            });
    }

    useEffect(() => {
        resetForm();
    }, [props.isOpen, resetForm])

    return (
        <PopupWithForm
            title="Новое место"
            name="newcard"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isValid={!isValid}
        >
            <input
                id="popup__title-input"
                type="text"
                placeholder="Название"
                value={values.name || ''}
                onChange={handleChange}
                className="popup__input popup__input_type_title"
                name="name"
                required
                minLength="2"
                maxLength="30"
            />
            <span className="popup__input-error popup__title-input-error">{errors.name}</span>
            <input
                id="popup__link-input"
                type="url"
                placeholder="Ссылка на изображение"
                value={values.link || ''}
                onChange={handleChange}
                className="popup__input popup__input_type_link"
                name="link"
                required
            />
            <span className="popup__input-error popup__link-input-error">{errors.link}</span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
