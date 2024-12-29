import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import styles from './FullscreenPresentationPreview.module.css'
import {appState} from "@/app/store/store.ts";
import RenderSlideItemElements from "@/features/presentationEditor/ui/SlidesList/RenderSlideItemElements.tsx";
import CustomButton from "@/shared/ui/CustomButton/CustomButton.tsx";

const FullscreenPresentationPreview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const elementRef = useRef<HTMLDivElement>(null);

    const presentation = useSelector((state: appState) =>
        state.present.presentations.find(p => p.id === Number(id))
    );
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);

    const { startFromCurrentSlide } = location.state || { startFromCurrentSlide: false };
    const initialSlideIndex = startFromCurrentSlide && selectedSlideId && presentation
        ? presentation.slides.findIndex(slide => slide.id === selectedSlideId)
        : 0

    const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.requestFullscreen().catch((err) => {
                console.error(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
            });
        }
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                navigate(`/presentation/${id}`);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [id, navigate]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                handleNextSlide();
            } else if (event.key === 'ArrowLeft') {
                handlePreviousSlide();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSlideIndex, presentation]);

    const handleNextSlide = () => {
        if (presentation && currentSlideIndex < presentation.slides.length - 1) {
            setCurrentSlideIndex(prevIndex => prevIndex + 1);
        }
    };
    const handlePreviousSlide = () => {
        if (presentation && currentSlideIndex > 0) {
            setCurrentSlideIndex(prevIndex => prevIndex - 1);
        }
    };
    if (!presentation) {
        return <div>Презентация не найдена</div>;
    }

    const currentSlide = presentation.slides[currentSlideIndex];
    const slideStyle = {
        backgroundColor: currentSlide?.backgroundImage
            ? 'transparent'
            : currentSlide?.backgroundColor || '#ffffff',
        backgroundImage: currentSlide?.backgroundImage
            ? `url(${currentSlide.backgroundImage})`
            : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    return (
        <div className={styles.fullscreenPreview} ref={elementRef} style={slideStyle}>
            {currentSlide && (
                <RenderSlideItemElements key={currentSlide.id} slide={currentSlide} multiplier={0.62}/>
            )}
            <div className={styles.slideControls}>
                <CustomButton
                    onClick={handlePreviousSlide}
                    disabled={currentSlideIndex === 0}
                    // style={{backgroundColor: currentSlideIndex === 0 ? 'rgba(0, 0, 0, 0.01)' : ''}}
                >
                    ←
                </CustomButton>
                <div>{`Слайд ${currentSlideIndex + 1} / ${presentation.slides.length}`}</div>
                <CustomButton
                    onClick={handleNextSlide}
                    disabled={currentSlideIndex === presentation.slides.length - 1}
                    // style={{backgroundColor: currentSlideIndex === presentation.slides.length - 1 ? 'rgba(0, 0, 0, 0.01)' : ''}}
                >
                    →
                </CustomButton>
            </div>
        </div>
    );
};

export default FullscreenPresentationPreview;
