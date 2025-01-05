import {useState} from "react";
import styles from "./SlideEditBackground.module.css";
import {ColorPicker} from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { popularColors } from "@/shared/constants/colors.ts";

const SlideEditBackground = () => {
    const {
        selectedSlide,
        updateSelectedSlide,
        updateAllSlidesBackgroundColorAction
    } = useStoreSelector();

    const [applyToAll, setApplyToAll] = useState(false);
    const [localColor, setLocalColor] = useState('#D9D9D9');

    const updateBackgroundColor = (backgroundColor: string) => {
        if (selectedSlide) {
            updateSelectedSlide(backgroundColor);
            if (applyToAll) {
                updateAllSlidesBackgroundColorAction(backgroundColor);
            }
        }
    };

    return (
        <div className={styles.backgroundEditWrapper}>
            <p className={styles.backgroundEditTitle}>Задний фон слайда</p>
            <div className={styles.headerPanelWrapper}>
                <ColorPicker
                    initialColor={localColor}
                    onColorChange={(color) => {
                        updateBackgroundColor(color);
                        setLocalColor(color);
                    }}
                />
                <div className={styles.applyToAllWrapper}>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={applyToAll}
                            onChange={() => setApplyToAll(!applyToAll)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                    <span>Все слайды</span>
                </div>
            </div>
            
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