import styles from './PresentationEditor.module.css'
import ToolPanel from "../../components/PresentationEditor/ToolPanel/ToolPanel.tsx";
import SlideEditor from "../../components/PresentationEditor/SlideEditor/SlideEditor.tsx";
import SlideList from "../../components/PresentationEditor/SlidesList/SlideList.tsx";
import ElementsList from "../../components/PresentationEditor/ElementsList/ElementsList.tsx";
import PresentationEditorHeader
    from "../../components/PresentationEditor/PresentationEditorHeader/PresentationEditorHeader.tsx";

const PresentationEditor = () => {
    return (
        <div className={styles.presentationEditor}>
            <PresentationEditorHeader/>
            <ToolPanel/>
            <div className={styles.wrapper}>
                <SlideList/>
                <SlideEditor/>
                <ElementsList/>
            </div>
        </div>
    );
};

export default PresentationEditor;
