import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import styles from './BorderEditPanel.module.css'
import {AppDispatch, appState } from "@/app/store/store.ts";
import { updateElement } from "@/app/store/actions.ts";
import {ColorPicker} from "@/shared/ui";

const BorderEditPanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);

    const presentations = useSelector((state: appState) => state.present.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const isShapeImageElement = selectedElement && (
        selectedElement.type === 'rectangle'
        || selectedElement.type === 'line'
        || selectedElement.type === 'circle'
        || selectedElement.type === 'image'
    );
    const updateBorderColor = (color: string) => {
        if (selectedElement) {
            dispatch(updateElement(selectedElement.id, { borderColor: color }));
        }
    };
    const popularColors = [
        '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9',
        '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9',
        '#DCEDC8', '#F0F4C3', '#FFF9C4', '#FFECB3', '#FFE0B2',
        '#FFCCBC', '#D7CCC8', '#F5F5F5', '#CFD8DC', '#FFC1E3',
        '#D4E157', '#AED581', '#81C784', '#4CAF50', '#8BC34A',
        '#CDDC39', '#FFF176', '#FFEE58', '#FFEB3B', '#FFC107',
        '#FFB74D', '#FF9800', '#FF7043', '#F57C00', '#E64A19',
        '#D84315', '#BF360C', '#9E9D24', '#AFB42B', '#689F38',
        '#388E3C', '#00695C', '#00796B', '#00897B', '#43A047',
        '#1B5E20', '#2E7D32', '#FFEBEE', '#E8F5E9', '#F1F8E9',
        '#E0F2F1', '#B2DFDB', '#C8E6C9', '#D7CCC8', '#FBE9E7',
        '#FFF8E1', '#FFF3E0', '#FFECB3', '#FFF176', '#FFD54F',
        '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
        '#E74C3C', '#3498DB', '#2ECC71', '#1ABC9C', '#F39C12',
        '#D35400', '#C0392B', '#9B59B6', '#2980B9', '#27AE60',
    ];
    const [localColor, setLocalColor] = useState('#000000');

    return (
        <>
            {isShapeImageElement && <div className={styles.colorEditWrapper}>
                <p className={styles.colorEditTitle}>Цвет границы</p>
                <ColorPicker
                    initialColor={localColor}
                    onColorChange={(color) => {
                        updateBorderColor(color);
                        setLocalColor(color);
                    }}
                />
                <div className={styles.colorsScrollWrapper}>
                    {popularColors.map((color, index) => (
                        <div
                            key={index}
                            className={`${styles.colorBlock} ${localColor === color ? styles.colorBlockSelected : ''}`}
                            style={{backgroundColor: color}}
                            onClick={() => {
                                updateBorderColor(color)
                                setLocalColor(color)
                            }}
                        >
                            <div className={styles.colorBlockDiv}></div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
};

export default BorderEditPanel;