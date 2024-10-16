import styles from './ToolPanel.module.css'
import {Slide} from "../../../store/types.ts";
import {addSlide, selectSlide} from "../../../store/actions.ts";
import {AppDispatch, appState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../UI/CustomButton/CustomButton.tsx";
import TextEditPanel from "./EditPanels/TextEditPanel/TextEditPanel.tsx";
import ImageEditPanel from "./EditPanels/ImageEditPanel/ImageEditPanel.tsx";
import ShapeEditPanel from "./EditPanels/ShapeEditPanel/ShapeEditPanel.tsx";
import ColorEditPanel from "./EditPanels/ColorEditPanel/ColorEditPanel.tsx";
import RotationEditPanel from "./EditPanels/RotationEditPanel/RotationEditPanel.tsx";
import SlideEditBackground from "./EditPanels/SlideEditBackground/SlideEditBackground.tsx";
import CreateElementButtons from "./EditPanels/CreateElementButtons/CreateElementButtons.tsx";
import TextColorEditPanel from "./EditPanels/TextColorEditPanel/TextColorEditPanel.tsx";
import BorderEditPanel from "./EditPanels/BorderEditPanel/BorderEditPanel.tsx";
import ThemeEditPanel from "./EditPanels/ThemeEditPanel/ThemeEditPanel.tsx";

const ToolPanel = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const presentations = useSelector((state: appState) => state.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const addNewSlide = () => {
        const newSlide: Slide = {
            id: Date.now(),
            elements: [],
            backgroundColor: '#D9D9D9',
            backgroundImage: selectedPresentation?.slides[0]?.backgroundImage,
        };
        if (selectedPresentation) {
            dispatch(addSlide(selectedPresentation.id, newSlide));
            dispatch(selectSlide(selectedPresentation.id, newSlide.id))
        }
    };
    const handleFullscreenPreviewFromFirstSlide = () => {
        if (selectedPresentationId) {
            navigate(`/presentation/${selectedPresentationId}/slide_preview`, { state: { startFromCurrentSlide: false } });
        }
    };
    const handleFullscreenPreviewFromCurrentSlide = () => {
        if (selectedPresentationId && selectedSlideId) {
            navigate(`/presentation/${selectedPresentationId}/slide_preview`,  { state: { startFromCurrentSlide: true } });
        }
    };
    return (
        <div className={styles.toolPanelWrapper}>
            <div className={styles.panelMain}>
                <CustomButton onClick={() => navigate('/')}>Вернуться на главную</CustomButton>
                <div>
                    <label>Id element: </label>
                    {selectedElement && selectedElement.id}
                </div>
                <div>
                    <label>Id slide: </label>
                    {selectedSlide && selectedSlide.id}
                </div>
                <CustomButton onClick={handleFullscreenPreviewFromFirstSlide}>Показ слайдов</CustomButton>
                <CustomButton onClick={handleFullscreenPreviewFromCurrentSlide}>Показ с текущего слайда</CustomButton>
                <CustomButton onClick={addNewSlide}>Добавить слайд</CustomButton>
            </div>
            <div className={styles.toolsElementsWrapper}>
                <div className={styles.toolsElements}>
                <CreateElementButtons/>
                    <TextEditPanel/>
                    <RotationEditPanel/>
                    <ImageEditPanel/>
                    <ShapeEditPanel/>
                    <ColorEditPanel/>
                    <BorderEditPanel/>
                    <TextColorEditPanel/>
                    <SlideEditBackground/>
                    <ThemeEditPanel/>
                </div>
            </div>
        </div>
    );
};

export default ToolPanel;