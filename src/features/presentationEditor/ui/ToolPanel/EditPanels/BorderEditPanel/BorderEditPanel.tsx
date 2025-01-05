import { useState } from "react";
import styles from './BorderEditPanel.module.css';
import { ColorPicker } from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { popularColors } from "@/shared/constants/colors.ts";

const BorderEditPanel = () => {
    const { selectedElement, updateSelectedElement } = useStoreSelector();
    const [localColor, setLocalColor] = useState('#000000');

    const isShapeImageElement = selectedElement && (
        selectedElement.type === 'rectangle' ||
        selectedElement.type === 'line' ||
        selectedElement.type === 'circle' ||
        selectedElement.type === 'image'
    );

    const updateBorderColor = (color: string) => {
        updateSelectedElement({ borderColor: color });
    };

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
                            style={{ backgroundColor: color }}
                            onClick={() => {
                                updateBorderColor(color);
                                setLocalColor(color);
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