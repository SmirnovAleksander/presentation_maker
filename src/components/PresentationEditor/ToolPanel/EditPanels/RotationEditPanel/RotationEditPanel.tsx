import {updateElement} from "../../../../../store/actions.ts";
import {AppDispatch, appState} from "../../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import styles from './RotationEditPanel.module.css'
import CustomButton from "../../../../UI/CustomButton/CustomButton.tsx";

const RotationEditPanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const presentations = useSelector((state: appState) => state.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);
    const updateRotation = (rotation: number) => {
        if (selectedElement) {
            dispatch(updateElement(selectedElement.id, { rotation }));
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