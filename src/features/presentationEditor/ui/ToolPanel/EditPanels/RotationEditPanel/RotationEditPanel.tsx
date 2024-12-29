import styles from './RotationEditPanel.module.css'
import { CustomButton } from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";

const RotationEditPanel = () => {
    const {
        selectedElement,
        updateSelectedElement,
    } = useStoreSelector();

    const updateRotation = (rotation: number) => {
        if (selectedElement) {
            updateSelectedElement( { rotation });
        }
    };
    const rotationAngles = [0, 45, 90, 135, 180, 225, 270, 315];
    const rotation = selectedElement ? selectedElement.rotation : 0;
    return (
        <div className={styles.rotationEditWrapper}>
            <p className={styles.rotationButtonsTitle}>Rotation</p>
            <div className={styles.rotationButtons}>
                {rotationAngles.map((angle) => (
                    <CustomButton
                        key={angle}
                        onClick={() => updateRotation(angle)}
                        style={{
                            backgroundColor: rotation === angle ? 'lightblue' : 'transparent',
                        }}
                    >
                        {angle}°
                    </CustomButton>
                ))}
            </div>
            {/*<div className={styles.rotationEditRange}>*/}
            {/*    <label>Поворот:</label>*/}
            {/*    <input*/}
            {/*        type="range"*/}
            {/*        min="0"*/}
            {/*        max="360"*/}
            {/*        value={rotation || 0}*/}
            {/*        onChange={(e) => {*/}
            {/*            updateRotation(Number(e.target.value))*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <span>{rotation || 0}°</span>*/}
            {/*</div>*/}
        </div>
    );
};

export default RotationEditPanel;