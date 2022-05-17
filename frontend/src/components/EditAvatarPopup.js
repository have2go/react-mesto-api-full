import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditAvatarPopup(props) {
    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();

        props
            .onUpdateAvatar({
                avatar: values.link,
            })
            .then(() => {
                setValues({link: ''});
            });
    }

    useEffect(() => {
        resetForm();
    }, [props.isOpen, resetForm])

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isValid={!isValid}
        >
            <input
                id="popup__avatar-input"
                type="url"
                placeholder="Ссылка на изображение"
                value={values.link || ''}
                onChange={handleChange}
                className="popup__input popup__input_type_link"
                name="link"
                required
            />
            <span className="popup__input-error popup__avatar-input-error">{errors.link}</span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
