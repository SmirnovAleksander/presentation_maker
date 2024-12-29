import { useState } from "react";
import styles from "./ColorPicker.module.css";

interface ColorPickerProps {
    onColorChange: (color: string) => void;
    initialColor?: string;
    delay?: number; // задержка обновления цвета в миллисекундах
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange, initialColor = "#D9D9D9", delay = 500 }) => {
    const [color, setColor] = useState(initialColor);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            onColorChange(newColor);
        }, delay);
        setTimeoutId(newTimeoutId);
    };

    return (
        <div className={styles.colorPickerWrapper}>
            <p className={styles.label}>Цвет:</p>
            <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className={styles.colorInput}
            />
        </div>
    );
};

export default ColorPicker;
