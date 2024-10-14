import styles from './ToolPanel.module.css'
import {Slide} from "../../../store/types.ts";
import {addSlide, selectSlide} from "../../../store/actions.ts";
import {AppDispatch, appState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import TextEditPanel from "./TextEditPanel/TextEditPanel.tsx";
import ImageEditPanel from "./ImageEditPanel/ImageEditPanel.tsx";
import ShapeEditPanel from "./ShapeEditPanel/ShapeEditPanel.tsx";
import CreateElementButtons from "./CreateElementButtons/CreateElementButtons.tsx";
import CustomButton from "../../UI/CustomButton/CustomButton.tsx";
import RotationEditPanel from "./RotationEditPanel/RotationEditPanel.tsx";
import ColorEditPanel from "./ColorEditPanel/ColorEditPanel.tsx";

const ToolPanel = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedPresentation  = useSelector((state: appState) =>
        state.presentations.find(p => p.id === selectedPresentationId)
    );
    const addNewSlide = () => {
        const newSlide: Slide = {
            id: Date.now(),
            elements: [],
            backgroundColor: '#ffffff',
        };
        if (selectedPresentation) {
            dispatch(addSlide(selectedPresentation.id, newSlide));
            dispatch(selectSlide(selectedPresentation.id, newSlide.id))
        }
    };
    return (
        <div className={styles.toolPanelWrapper}>
            <div className={styles.panelMain}>
                <CustomButton onClick={() => navigate('/')}>Вернуться на главную</CustomButton>
                <CustomButton onClick={addNewSlide}>Добавить слайд</CustomButton>
            </div>
            <div className={styles.toolsElementsWrapper}>
                <div className={styles.toolsElements}>
                    <TextEditPanel/>
                    <ImageEditPanel/>
                    <ShapeEditPanel/>
                    <RotationEditPanel/>
                    <ColorEditPanel/>
                </div>
                <CreateElementButtons/>
            </div>
        </div>
    );
};

export default ToolPanel;