import { useState } from "react";
import styles from './GradientEditPanel.module.css';
import { ColorPicker, CustomButton } from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import SwitchToggle from "@/shared/ui/SwitchToggle/SwitchToggle";

const GradientEditPanel = () => {
    const { selectedSlide, updateSelectedSlide, updateAllSlidesBackgroundColorAction} = useStoreSelector();
    const [color1, setColor1] = useState<string>('#ff0000');
    const [color2, setColor2] = useState<string>('#0000ff');
    const [direction, setDirection] = useState<string>('to right');
    const [gradientType, setGradientType] = useState<string>('linear');
    const [applyToAll, setApplyToAll] = useState(false);

    const updateBackgroundColor = (backgroundColor: string) => {
        if (selectedSlide) {
            updateSelectedSlide(backgroundColor);
            if (applyToAll) {
                updateAllSlidesBackgroundColorAction(backgroundColor);
            }
        }
    };

    const applyGradient = () => {
        const gradient = `${gradientType}-gradient(${direction}, ${color1}, ${color2})`;
        updateBackgroundColor(gradient);
    };

    const removeGradient = () => {
        updateBackgroundColor('');
    };

    const isGradientApplied = selectedSlide?.backgroundColor?.includes('gradient');

    return (
        <>
            <div className={styles.colorEditWrapper}>
                <p className={styles.colorEditTitle}>Градиент слайда</p>
                <div className={styles.editPanels}>
                    <div className={styles.gradientColorPicker}>
                        <ColorPicker
                            initialColor={color1}
                            onColorChange={(color) => {
                                setColor1(color);
                                applyGradient();
                            }}
                        />
                        <ColorPicker
                            initialColor={color2}
                            onColorChange={(color) => {
                                setColor2(color);
                                applyGradient();
                            }}
                        />
                    </div>
                    <div className={styles.gradientTypePanel}>
                        <div className={styles.itemBlocWrapper} style={{ gap: '3px' }}>
                            Направление:
                            <select
                                style={{ width: '150px' }}
                                value={direction}
                                onChange={(e) => {
                                    setDirection(e.target.value);
                                    applyGradient();
                                }}
                            >
                                <option value="to right">Слева направо</option>
                                <option value="to left">Справа налево</option>
                                <option value="to bottom">Сверху вниз</option>
                                <option value="to top">Снизу вверх</option>
                            </select>
                        </div>
                        <div className={styles.itemBlocWrapper} style={{ gap: '3px' }}>
                            Тип градиента:
                            <select
                                style={{ width: '150px' }}
                                value={gradientType}
                                onChange={(e) => {
                                    setGradientType(e.target.value);
                                    applyGradient();
                                }}
                            >
                                <option value="linear">Линейный</option>
                                <option value="radial">Круговой</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.applyToAllWrapper}>
                    <div>
                        <SwitchToggle
                            checked={applyToAll}
                            onChange={setApplyToAll}
                        />
                        <span>Все слайды</span>
                    </div>
                    <CustomButton 
                        onClick={isGradientApplied ? removeGradient : applyGradient} 
                        style={{
                            backgroundColor: isGradientApplied ? '#fdcbcb' : undefined,
                            minWidth: '200px'
                        }}
                    >
                        {isGradientApplied ? 'Убрать градиент' : 'Применить градиент'}
                    </CustomButton>
                </div>
                
            </div>
        </>
    );
};

export default GradientEditPanel;