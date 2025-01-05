import {useState} from "react";
import styles from './TextColorEditPanel.module.css'
import {ColorPicker} from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { popularColors } from "@/shared/constants/colors.ts";

const TextColorEditPanel = () => {
    const {
        selectedElement,
        updateSelectedElement,
    } = useStoreSelector();

    const isTextElement = selectedElement && (selectedElement.type === 'text');

    const updateColor = (color: string) => {
        if (selectedElement) {
            updateSelectedElement( { color });
        }
    };
    const [localColor, setLocalColor] = useState('#000000');

    return (
        <>
            {isTextElement && <div className={styles.colorEditWrapper}>
                <p className={styles.colorEditTitle}>Цвет текста</p>
                <ColorPicker
                    initialColor={localColor}
                    onColorChange={(color) => {
                        updateColor(color);
                        setLocalColor(color);
                    }}
                />
                <div className={styles.colorsScrollWrapper}>
                    {popularColors.map((color, index) => (
                        <div
                            key={index}
                            className={`${styles.colorBlock} ${localColor === color ? styles.colorBlockSelected : ''}`}
                            onClick={() => {
                                updateColor(color)
                                setLocalColor(color)
                            }}
                        >
                            <h1 style={{color: color}}>A</h1>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
};

export default TextColorEditPanel;