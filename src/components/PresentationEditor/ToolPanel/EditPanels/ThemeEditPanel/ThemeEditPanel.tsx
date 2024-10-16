import styles from './ThemeEditPanel.module.css'
import template1 from '../../../../../assets/PresentationFonts/template-1.jpg';
import template2 from '../../../../../assets/PresentationFonts/template-2.jpg';
import template3 from '../../../../../assets/PresentationFonts/template-3.jpg';
import template4 from '../../../../../assets/PresentationFonts/template-4.jpg';
import template5 from '../../../../../assets/PresentationFonts/template-5.jpg';
import template6 from '../../../../../assets/PresentationFonts/template-6.jpg';
import {updateSlide} from "../../../../../store/actions.ts";
import {AppDispatch, appState} from "../../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";

const ThemeEditPanel = () => {
    const themes = [
        { id: 1, image: template1 },
        { id: 2, image: template2 },
        { id: 3, image: template3 },
        { id: 4, image: template4 },
        { id: 5, image: template5 },
        { id: 6, image: template6 },
    ];
    const dispatch: AppDispatch = useDispatch();
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);

    const handleThemeSelect = (image: string) => {
        if (selectedSlideId)
            dispatch(updateSlide(selectedSlideId, '#ffffff', image));
    };
    return (
        <div className={styles.themeEditWrapper}>
            <p className={styles.themeEditTitle}>Задний фон слайда:</p>
            <div className={styles.themeEditScrollWrapper}>
                {themes.map((theme) => (
                    <div key={theme.id} className={styles.themeItem} onClick={() => handleThemeSelect(theme.image)}>
                        <img src={theme.image} alt={`Тема ${theme.id}`} className={styles.themeImage} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemeEditPanel;