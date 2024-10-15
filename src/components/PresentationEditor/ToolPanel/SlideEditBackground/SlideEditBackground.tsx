import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import styles from "./SlideEditBackground.module.css";
import {updateSlide} from "../../../../store/actions.ts";

const SlideEditBackground = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);

    const presentations = useSelector((state: appState) => state.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);

    const updateBackgroundColor = (backgroundColor: string) => {
        if (selectedSlide) {
            dispatch(updateSlide(selectedSlide.id, backgroundColor));
        }
    };
    const [myTimeout, setMyTimeout] = useState(0);

    const popularColors = [
        '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
        '#E74C3C', '#3498DB', '#2ECC71', '#1ABC9C', '#F39C12',
        '#D35400', '#C0392B', '#9B59B6', '#2980B9', '#27AE60',
    ];
    const [localColor, setLocalColor] = useState('#D9D9D9');

    return (
        <>
            {selectedSlide && <div className={styles.backgroundEditWrapper}>
                <div>
                    <p className={styles.backgroundEditTitle}>Задний фон презентации:</p>
                    <div className={styles.colorPickerWrapper}>
                        <p>Цвет:</p>
                        <input
                            type="color"
                            onChange={e => {
                                clearTimeout(myTimeout);
                                setMyTimeout(
                                    setTimeout(() => {
                                        updateBackgroundColor(e.target.value);
                                    }, 500) // <-- Delay api call by 300 milliseconds. Set to what you prefer
                                );
                            }}
                        />
                    </div>
                    <div className={styles.colorsScrollWrapper}>
                        {popularColors.map((color, index) => (
                            <div
                                key={index}
                                className={`${styles.colorBlock} ${localColor === color ? styles.colorBlockSelected : ''}`}
                                style={{
                                    backgroundColor: color,
                                }}
                                onClick={() => {
                                    updateBackgroundColor(color)
                                    setLocalColor(color)
                                }}
                            >
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
        </>
    );
};

export default SlideEditBackground;