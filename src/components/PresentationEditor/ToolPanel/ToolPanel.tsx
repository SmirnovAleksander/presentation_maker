import styles from './ToolPanel.module.css'
import {Slide} from "../../../store/types.ts";
import {addSlide, redo, undo} from "../../../store/actions.ts";
import {AppDispatch, appState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../UI/CustomButton/CustomButton.tsx";
import {useState} from "react";
import HomePanel from "./Panels/HomePanel/HomePanel.tsx";
import InsertPanel from "./Panels/InsertPanel/InsertPanel.tsx";
import FormatPanel from "./Panels/FormatPanel/FormatPanel.tsx";
import SlideDesignPanel from "./Panels/SlideDesignPanel/SlideDesignPanel.tsx";

const ToolPanel = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);
    const pastLength = useSelector((state: appState) => state.past.length)
    const futureLength = useSelector((state: appState) => state.future.length)
    const presentations = useSelector((state: appState) => state.present.presentations);
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
            dispatch(addSlide(newSlide));
            setActivePanel('slideDesign')
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

    const [activePanel, setActivePanel] = useState<string>('home');
    const renderActivePanel = () => {
        switch (activePanel) {
            case 'home':
                return <HomePanel />;
            case 'insert':
                return <InsertPanel />;
            case 'slideDesign':
                return <SlideDesignPanel/>
            case 'format':
                return <FormatPanel />;
            default:
                return (
                    <div>
                        Error when render panels
                    </div>
                );
        }
    }
    const handleUndo = () => {
        if (pastLength > 0) {
            dispatch(undo());
        }
    };

    const handleRedo = () => {
        if (futureLength > 0) {
            dispatch(redo());
        }
    };
    return (
        <div className={styles.toolPanelWrapper}>
            <div className={styles.panelMain}>
                <CustomButton onClick={() => navigate('/')} disabled={selectedPresentation!.title === ''}>Вернуться на
                    главную</CustomButton>
                <div>
                    <label>Id element: </label>
                    {selectedElement && selectedElement.id}
                </div>
                <div>
                    <label>Id slide: </label>
                    {selectedSlide && selectedSlide.id}
                </div>
                <div className={styles.undoableButtonsWrapper}>
                    <CustomButton onClick={handleUndo} disabled={pastLength === 0 || selectedPresentation!.slides.length === 0}>
                        Undo
                    </CustomButton>
                    <CustomButton onClick={handleRedo} disabled={futureLength === 0}>
                        Redo
                    </CustomButton>
                </div>
                <CustomButton
                    onClick={handleFullscreenPreviewFromFirstSlide}
                    disabled={selectedPresentation && selectedPresentation.slides.length === 0}
                >
                    Показ слайдов
                </CustomButton>
                <CustomButton
                    onClick={handleFullscreenPreviewFromCurrentSlide}
                    disabled={selectedPresentation && selectedPresentation.slides.length === 0}
                >
                    Показ с текущего слайда
                </CustomButton>
                <CustomButton onClick={addNewSlide}>Добавить слайд</CustomButton>
            </div>
            <div className={styles.toolsElementsWrapper}>
                <div className={styles.panelsButtonsWrapper}>
                    <CustomButton onClick={() => setActivePanel('home')}
                                  style={{backgroundColor: activePanel === 'home' ? 'lightblue' : 'transparent'}}>Главная</CustomButton>
                    <CustomButton onClick={() => setActivePanel('insert')}
                                  style={{backgroundColor: activePanel === 'insert' ? 'lightblue' : 'transparent'}}>Вставка</CustomButton>
                    <CustomButton onClick={() => setActivePanel('slideDesign')}
                                  style={{backgroundColor: activePanel === 'slideDesign' ? 'lightblue' : 'transparent'}}>Дизайн слайдов</CustomButton>
                    <CustomButton onClick={() => setActivePanel('format')}
                                  style={{
                                      backgroundColor: activePanel === 'format'
                                          ? 'lightblue'
                                          : (selectedElementId && activePanel !== 'format')
                                              ? '#fdcbcb'
                                              : 'transparent',
                    }}>Формат</CustomButton>
                </div>
                <div className={styles.toolsElements}>
                    {renderActivePanel()}
                </div>
            </div>
        </div>
    );
};

export default ToolPanel;