import ShapeEditPanel from "../../EditPanels/ShapeEditPanel/ShapeEditPanel.tsx";
import ColorEditPanel from "../../EditPanels/ColorEditPanel/ColorEditPanel.tsx";
import TextColorEditPanel from "../../EditPanels/TextColorEditPanel/TextColorEditPanel.tsx";
import ImageEditPanel from "../../EditPanels/ImageEditPanel/ImageEditPanel.tsx";
import BorderEditPanel from "../../EditPanels/BorderEditPanel/BorderEditPanel.tsx";
import {useSelector} from "react-redux";
import {appState} from "../../../../../store/store.ts";
import styles from './FormatPanel.module.css'

const FormatPanel = () => {
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);
    return (
        <>
            {selectedElementId ? (
                <>
                    <ShapeEditPanel/>
                    <ColorEditPanel/>
                    <TextColorEditPanel/>
                    <ImageEditPanel/>
                    <BorderEditPanel/>
                </>
            ) : (
                <div className={styles.errorContainer}>
                    <h4>Пожалуйста, выберите элемент для редактирования.</h4>
                </div>
            )}
        </>
    );
};

export default FormatPanel;