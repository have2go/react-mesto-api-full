import { useEffect } from 'react';

const Popup = ({ isOpen, name, onClose, children }) => {
    // внутри указываем `useEffect` для обработчика `Escape`
    useEffect(() => {
        // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
        if (!isOpen) return;
        // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', closeByEscape);
        // обязательно удаляем обработчик в `clean-up` функции
        return () => document.removeEventListener('keydown', closeByEscape);
        // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
    }, [isOpen, onClose]);

    // создаем обработчик оверлея
    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlay}>
            <div className="popup__container">
                <div className="popup__content">
                    <button className="popup__close-btn" onClick={onClose} id={`${name}-btn`} type="button"></button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Popup;
