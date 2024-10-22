import styles from './PresentationEditor.module.css'
import ToolPanel from "../../components/PresentationEditor/ToolPanel/ToolPanel.tsx";
import SlideEditor from "../../components/PresentationEditor/SlideEditor/SlideEditor.tsx";
import SlideList from "../../components/PresentationEditor/SlidesList/SlideList.tsx";
import {useSelector} from "react-redux";
import {appState} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import ElementsList from "../../components/PresentationEditor/ElementsList/ElementsList.tsx";
import PresentationEditorHeader
    from "../../components/PresentationEditor/PresentationEditorHeader/PresentationEditorHeader.tsx";

const PresentationEditor = () => {
    const navigate = useNavigate();
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    useEffect(() => {
        if (!selectedPresentationId) {
            navigate("/");
        }
    }, [selectedPresentationId, navigate]);
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
