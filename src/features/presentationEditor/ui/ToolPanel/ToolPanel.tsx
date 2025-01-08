import styles from './ToolPanel.module.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import HomePanel from "./Panels/HomePanel/HomePanel.tsx";
import InsertPanel from "./Panels/InsertPanel/InsertPanel.tsx";
import FormatPanel from "./Panels/FormatPanel/FormatPanel.tsx";
import SlideDesignPanel from "./Panels/SlideDesignPanel/SlideDesignPanel.tsx";
import {Slide} from "@/shared/types/types.ts";
import { CustomButton } from '@/shared/ui';
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { 
    MdUndo, 
    MdRedo, 
    MdArrowBack, 
    MdHome,
    MdImportExport,
    MdPalette,
    MdFormatColorFill
} from "react-icons/md";
import { 
    PiPresentationLight,
    PiSlideshowLight 
} from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";

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

    const isDisabledButtons: boolean = selectedPresentation?.slides.length === 0

    const isDisableUndo = pastLength === 0 || isDisabledButtons
    const isDisableRedo = futureLength === 0
    const isDisableSlideShow = selectedPresentation && isDisabledButtons
    const isEmptyTitle = selectedPresentation && selectedPresentation.title === ''
    const disabledStyle: React.CSSProperties = { backgroundColor: 'rgba(0, 0, 0, 0.1)'};
    const disabledStyleSlideShow: React.CSSProperties = { backgroundColor: 'rgba(0, 0, 0, 0.1)', flexDirection: 'column', display: 'flex'};
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
                        <MdArrowBack size={18} />
                        <p>На главную</p>
                    </CustomButton>
                    <CustomButton
                        onClick={handleUndo}
                        style={isDisableUndo ? disabledStyle : undefined}
                    >
                        <MdUndo size={14} />
                    </CustomButton>

                    <CustomButton
                        onClick={handleRedo}
                        style={isDisableRedo  ? disabledStyle : undefined}
                    >
                        <MdRedo size={14} />
                    </CustomButton>
                </div>
                <div style={{display: 'flex', gap: '7px'}}>
                    <CustomButton
                        onClick={handleFullscreenPreviewFromFirstSlide}
                        disabled={isDisableSlideShow}
                        style={isDisableSlideShow ? disabledStyleSlideShow : { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                    >
                        <PiPresentationLight  size={34} />
                        <p>Показ слайдов</p>
                    </CustomButton>
                    <CustomButton
                        onClick={handleFullscreenPreviewFromCurrentSlide}
                        disabled={isDisableSlideShow}
                        style={isDisableSlideShow ? disabledStyleSlideShow : { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <PiSlideshowLight size={34} />
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
                        <IoAddCircleOutline size={22} />
                        <p>Добавить слайд</p>
                    </CustomButton>
                </div>

            </div>
            <div className={styles.toolsElementsWrapper}>
                <div className={styles.panelsButtonsWrapper}>
                    <CustomButton 
                        onClick={() => setActivePanel('home')}
                        style={{backgroundColor: activePanel === 'home' ? 'lightblue' : 'transparent'}}
                    >
                        <MdHome size={18}/>
                        Главная
                    </CustomButton>
                    <CustomButton 
                        onClick={() => setActivePanel('insert')}
                        style={{backgroundColor: activePanel === 'insert' ? 'lightblue' : 'transparent'}}
                        disabled={isDisabledButtons}
                    >
                        <MdImportExport size={18}/>
                        Импорт/Экспор
                    </CustomButton>
                    <CustomButton 
                        onClick={() => setActivePanel('slideDesign')}
                        style={{backgroundColor: activePanel === 'slideDesign' ? 'lightblue' : 'transparent'}}
                        disabled={isDisabledButtons}
                    >
                        <MdPalette size={16}/>
                        Дизайн слайдов
                    </CustomButton>
                    <CustomButton 
                        onClick={() => setActivePanel('format')}
                        style={{
                            backgroundColor: activePanel === 'format'
                                ? 'lightblue'
                                : (selectedElementId && activePanel !== 'format')
                                    ? '#fdcbcb'
                                    : 'transparent',
                        }}
                        disabled={isDisabledButtons}
                    >
                        <MdFormatColorFill size={16}/>Формат
                    </CustomButton>
                </div>
                <div className={styles.toolsElements}>
                    {renderActivePanel()}
                </div>
            </div>
        </div>
    );
};

export default ToolPanel;