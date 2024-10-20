import styles from './ToolPanel.module.css'
import {Slide} from "../../../store/types.ts";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../UI/CustomButton/CustomButton.tsx";
import {useState} from "react";
import HomePanel from "./Panels/HomePanel/HomePanel.tsx";
import InsertPanel from "./Panels/InsertPanel/InsertPanel.tsx";
import FormatPanel from "./Panels/FormatPanel/FormatPanel.tsx";
import SlideDesignPanel from "./Panels/SlideDesignPanel/SlideDesignPanel.tsx";
import useEditorStore from "../../../store/store.ts";

const ToolPanel = () => {
    const navigate = useNavigate();
    const {
        selectedPresentationId,
        selectedSlideId,
        selectedElementId,
        presentations,
        addSlide,
        selectSlide,
    } = useEditorStore();

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
            addSlide(newSlide);
            selectSlide(newSlide.id)
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