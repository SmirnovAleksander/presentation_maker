import styles from './ToolPanel.module.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import HomePanel from "./Panels/HomePanel/HomePanel.tsx";
import InsertPanel from "./Panels/InsertPanel/InsertPanel.tsx";
import FormatPanel from "./Panels/FormatPanel/FormatPanel.tsx";
import SlideDesignPanel from "./Panels/SlideDesignPanel/SlideDesignPanel.tsx";
import undoIcon from '@/assets/undo.png'
import reduIcon from '@/assets/redo.png'
import arrowBackIcon from '@/assets/arrow.png'
import interfaceIcon from '@/assets/interface.png'
import slideShowIcon from '@/assets/slideshow.png'
import plusIcon from '@/assets/add.png'
import {Slide} from "@/shared/types/types.ts";
import { CustomButton } from '@/shared/ui';
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";

const ToolPanel = () => {
    const navigate = useNavigate();
    const {
        selectedPresentation,
        selectedPresentationId,
        selectedSlideId,
        pastLength,
        futureLength,
        addSlideAction,
        undoAction,
        redoAction,
        selectedElementId
    } = useStoreSelector();

    const addNewSlide = () => {
        const newSlide: Slide = {
            id: Date.now(),
            elements: [],
            backgroundColor: '#D9D9D9',
            backgroundImage: selectedPresentation?.slides[0]?.backgroundImage,
        };
        if (selectedPresentation) {
            addSlideAction(newSlide);
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
        if (selectedPresentation!.title !== '' && pastLength > 0) {
            undoAction()
        }
    };

    const handleRedo = () => {
        if (futureLength > 0) {
            redoAction()
        }
    };
    const isDisableUndo = pastLength === 0 || selectedPresentation!.slides.length === 0
    const isDisableRedo = futureLength === 0
    const isDisableSlideShow = selectedPresentation && selectedPresentation.slides.length === 0
    const isEmptyTitle = selectedPresentation && selectedPresentation.title === ''
    const disabledStyle = { backgroundColor: 'rgba(0, 0, 0, 0.1)'};
    return (
        <div className={styles.toolPanelWrapper}>
            <div className={styles.panelMain}>
                <div className={styles.undoableButtonsWrapper}>
                    <CustomButton
                        onClick={() => !isEmptyTitle && navigate('/')}
                        disabled={isEmptyTitle}
                        style={{
                            ...{alignItems: 'center', justifyContent: 'center', gap: '7px', display: 'flex', padding: '5px'},
                            ...(isEmptyTitle ? disabledStyle : {})
                        }}
                    >
                        <img src={arrowBackIcon} alt={'←'} width={14} height={14}/>
                        <p>На главную</p>
                    </CustomButton>
                    <CustomButton
                        onClick={handleUndo}
                        style={isDisableUndo ? disabledStyle : undefined}
                    >
                        <img src={undoIcon} alt={'undo'} width={14} height={14}/>
                    </CustomButton>

                    <CustomButton
                        onClick={handleRedo}
                        style={isDisableRedo  ? disabledStyle : undefined}
                    >
                        <img src={reduIcon} alt={'redo'} width={14} height={14}/>
                    </CustomButton>
                </div>
                <div style={{display: 'flex', gap: '7px'}}>
                    <CustomButton
                        onClick={handleFullscreenPreviewFromFirstSlide}
                        disabled={isDisableSlideShow}
                        style={isDisableSlideShow ? disabledStyle : { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <img src={interfaceIcon} alt={'([])'} width={34} height={34}/>
                        <p>Показ слайдов</p>
                    </CustomButton>
                    <CustomButton
                        onClick={handleFullscreenPreviewFromCurrentSlide}
                        disabled={isDisableSlideShow}
                        style={isDisableSlideShow ? disabledStyle : { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <img src={slideShowIcon} alt={'([!])'} width={44} height={44}/>
                        <p>C текущего слайда</p>
                    </CustomButton>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CustomButton
                        onClick={addNewSlide}
                        style={{
                            ...{alignItems: 'center', justifyContent: 'center', gap: '7px', display: 'flex', padding: '5px'},
                            ...(isEmptyTitle ? disabledStyle : {})
                        }}
                        disabled={isEmptyTitle}
                    >
                        <img src={plusIcon} alt={'+'} width={18} height={18}/>
                        <p>Добавить слайд</p>
                    </CustomButton>
                </div>

            </div>
            <div className={styles.toolsElementsWrapper}>
                <div className={styles.panelsButtonsWrapper}>
                    <CustomButton onClick={() => setActivePanel('home')}
                                  style={{backgroundColor: activePanel === 'home' ? 'lightblue' : 'transparent'}}>Главная</CustomButton>
                    <CustomButton onClick={() => setActivePanel('insert')}
                                  style={{backgroundColor: activePanel === 'insert' ? 'lightblue' : 'transparent'}}>Импорт/Экспорт</CustomButton>
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