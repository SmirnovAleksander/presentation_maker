import { useState } from "react";
import styles from './ColorEditPanel.module.css';
import { ColorPicker } from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { popularColors } from "@/shared/constants/colors.ts";


const ColorEditPanel = () => {
    const { selectedElement, updateSelectedElement } = useStoreSelector();
    const [localColor, setLocalColor] = useState('#000000');

    const isShapeElement = selectedElement && (
        selectedElement.type === 'rectangle'
        || selectedElement.type === 'line'
        || selectedElement.type === 'circle'
    );
    const isTextElement = selectedElement && selectedElement.type === 'text';

    const updateColor = (color: string) => {
        if (isShapeElement) {
            updateSelectedElement({ color });
        }
    };

    const updateBackgroundColor = (backgroundColor: string) => {
        if (isTextElement) {
            updateSelectedElement({ backgroundColor });
        }
    };
    return (
        <>
            {(isShapeElement || isTextElement) && <div className={styles.colorEditWrapper}>
                <p className={styles.colorEditTitle}>Цвет фона элемента</p>
                <ColorPicker
                    initialColor={localColor}
                    onColorChange={(color) => {
                        if (isTextElement) {
                            updateBackgroundColor(color);
                        } else {
                            updateColor(color);
                        }
                        setLocalColor(color);
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
                                if (isShapeElement)
                                    updateColor(color)
                                if (isTextElement)
                                    updateBackgroundColor(color)
                                setLocalColor(color)
                            }}
                        >
                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
};

export default ColorEditPanel;