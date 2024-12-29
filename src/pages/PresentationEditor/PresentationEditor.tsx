import styles from './PresentationEditor.module.css'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {appState} from "@/app/store/store.ts";
import PresentationEditorHeader
    from "@/features/presentationEditor/ui/PresentationEditorHeader/PresentationEditorHeader.tsx";
import ToolPanel from "@/features/presentationEditor/ui/ToolPanel/ToolPanel.tsx";
import SlideList from "@/features/presentationEditor/ui/SlidesList/SlideList.tsx";
import SlideEditor from "@/features/presentationEditor/ui/SlideEditor/SlideEditor.tsx";
import ElementsList from "@/features/presentationEditor/ui/ElementsList/ElementsList.tsx";

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
