import {useState} from "react";
import styles from "./SlideEditBackground.module.css";
import {ColorPicker} from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";

const SlideEditBackground = () => {
    const {
        selectedSlide,
        updateSelectedSlide
    } = useStoreSelector();

    const updateBackgroundColor = (backgroundColor: string) => {
        if (selectedSlide) {
            updateSelectedSlide(backgroundColor);
        }
    };

    const popularColors = [
        '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
        '#E74C3C', '#3498DB', '#2ECC71', '#1ABC9C', '#F39C12',
        '#D35400', '#C0392B', '#9B59B6', '#2980B9', '#27AE60',
    ];
    const [localColor, setLocalColor] = useState('#D9D9D9');

    return (
        <div className={styles.backgroundEditWrapper}>
            <p className={styles.backgroundEditTitle}>Задний фон слайда</p>
            <ColorPicker
                initialColor={localColor}
                onColorChange={(color) => {
                    updateBackgroundColor(color);
                    setLocalColor(color);
                }}
            />
            <div className={styles.colorsScrollWrapper}>
                {popularColors.map((color, index) => (
                    <div
                        key={index}
                        style={{backgroundColor: color}}
                        className={`${styles.colorBlock} ${localColor === color ? styles.colorBlockSelected : ''}`}
                        onClick={() => {
                            updateBackgroundColor(color);
                            setLocalColor(color);
                        }}
                    >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlideEditBackground;