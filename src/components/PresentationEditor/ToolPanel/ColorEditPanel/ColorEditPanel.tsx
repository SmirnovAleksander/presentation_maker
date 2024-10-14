import styles from './ColorEditPanel.module.css'
import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateElement} from "../../../../store/actions.ts";
import {useState} from "react";

const ColorEditPanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const presentations = useSelector((state: appState) => state.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const isShapeElement = selectedElement && (
        selectedElement.type === 'rectangle'
        || selectedElement.type === 'line'
        || selectedElement.type === 'circle'
    );
    const updateColor = (color: string) => {
        if (selectedElement) {
            dispatch(updateElement(selectedElement.id, { color }));
        }
    };
    const [myTimeout, setMyTimeout] = useState(0);

    const popularColors = [
        '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
        '#E74C3C', '#3498DB', '#2ECC71', '#1ABC9C', '#F39C12',
        '#D35400', '#C0392B', '#9B59B6', '#2980B9', '#27AE60',
    ];
    const [localColor, setLocalColor] = useState('#000000');

    return (
        <div className={styles.colorEditWrapper}>
            {isShapeElement && <div>
                <label>Цвет текста:</label>
                <input
                    type="color"
                    onChange={e => {
                        clearTimeout(myTimeout);
                        setMyTimeout(
                            setTimeout(() => {
                                updateColor(e.target.value);
                            }, 500) // <-- Delay api call by 300 milliseconds. Set to what you prefer
                        );
                    }}
                />
                <div className={styles.colorsScrollWrapper}>
                    {popularColors.map((color, index) => (
                        <div
                            key={index}
                            className={`${styles.colorBlock} ${localColor === color ? styles.colorBlockSelected : ''}`}
                            style={{
                                backgroundColor: color,
                            }}
                            onClick={() => {
                                updateColor(color)
                                setLocalColor(color)
                            }}
                        >
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    );
};

export default ColorEditPanel;