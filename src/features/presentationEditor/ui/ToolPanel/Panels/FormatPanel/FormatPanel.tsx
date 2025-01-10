import {useSelector} from "react-redux";
import styles from './FormatPanel.module.css'
import ShapeEditPanel from "@/features/presentationEditor/ui/ToolPanel/EditPanels/ShapeEditPanel/ShapeEditPanel.tsx";
import ColorEditPanel from "@/features/presentationEditor/ui/ToolPanel/EditPanels/ColorEditPanel/ColorEditPanel.tsx";
import TextColorEditPanel
    from "@/features/presentationEditor/ui/ToolPanel/EditPanels/TextColorEditPanel/TextColorEditPanel.tsx";
import ImageEditPanel from "@/features/presentationEditor/ui/ToolPanel/EditPanels/ImageEditPanel/ImageEditPanel.tsx";
import BorderEditPanel from "@/features/presentationEditor/ui/ToolPanel/EditPanels/BorderEditPanel/BorderEditPanel.tsx";
import {appState} from "@/app/store/store.ts";
import GradientShapeEditPanel from "../../EditPanels/GradientShapeEditPanel/GradientShapeEditPanel";

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
                    <GradientShapeEditPanel/>
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