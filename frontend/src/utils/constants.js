export const cardsContainer = ".elements";
export const cardSelector = "#cards-template";
export const popupProfileSelector = ".popup_profile";
export const popupNewCardSelector = ".popup_newcard";
export const popupBigImageSelector = ".img-popup";
export const popupConfirmSelector = ".confirm-popup";
export const popupAvatarSelector = ".popup-avatar";
export const userInfoSelectors = {
    nameSelector: ".profile__name",
    aboutSelector: ".profile__description",
    avatarSelector: ".profile__photo",
};
export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        alt: "Архыз",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
        alt: "Челябинская область",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
        alt: "Иваново",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
        alt: "Камчатка",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
        alt: "Холмогорский район",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
        alt: "Байкал",
    },
];

export const validationSelectors = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-btn",
    inactiveButtonClass: "popup__save-btn_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
    popups: ".popup",
};
