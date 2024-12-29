import styles from './SlideList.module.css'
import {useDispatch, useSelector} from "react-redux";
import SlideItem from "./SlideItem/SlideItem.tsx";
import {DragEvent, useState} from "react";
import {AppDispatch, appState} from "@/app/store/store.ts";
import {moveSlide} from "@/app/store/actions.ts";

const SlideList = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedPresentation = useSelector((state: appState) =>
        state.present.presentations.find(p => p.id === selectedPresentationId)
    );
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [draggingSlideId, setDraggingSlideId] = useState<number | null>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!draggingSlideId) return;

        const dropY = e.clientY;
        const slideElements = document.querySelectorAll(`.${styles.slideDropZone}`);
        
        let newDragOverIndex = selectedPresentation!.slides.length;
        const currentIndex = selectedPresentation!.slides.findIndex(slide => slide.id === draggingSlideId);

        slideElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const elementMiddle = rect.top + rect.height / 2;
            
            if (dropY < elementMiddle) {
                newDragOverIndex = Math.min(newDragOverIndex, index);
            }
        });

        // Не показываем индикатор рядом с перетаскиваемым элементом
        if (newDragOverIndex === currentIndex || newDragOverIndex === currentIndex + 1) {
            setDragOverIndex(null);
        } else {
            setDragOverIndex(newDragOverIndex);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (dragOverIndex !== null && draggingSlideId) {
            const currentIndex = selectedPresentation?.slides.findIndex(slide => slide.id === draggingSlideId);
            if (currentIndex !== undefined && currentIndex !== -1) {
                const finalIndex = currentIndex < dragOverIndex ? dragOverIndex - 1 : dragOverIndex;
                dispatch(moveSlide(draggingSlideId, finalIndex));
            }
        }
        setDragOverIndex(null);
        setDraggingSlideId(null);
    };

    const handleDragStart = (slideId: number) => {
        setDraggingSlideId(slideId);
    };

    const handleDragEnd = () => {
        setDraggingSlideId(null);
        setDragOverIndex(null);
    };

    return (
        <div 
            className={styles.slideListWrapper}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {selectedPresentation && selectedPresentation.slides.map((slide, index) => (
                <div key={slide.id} className={styles.slideDropZone}>
                    {dragOverIndex === index && draggingSlideId !== slide.id && (
                        <div className={styles.dropIndicator} />
                    )}
                    <SlideItem
                        slide={slide}
                        slideIndex={index + 1}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    />
                </div>
            ))}
            <div className={styles.slideDropZone} style={{ minHeight: '20px' }}>
                {dragOverIndex === selectedPresentation?.slides.length && 
                 draggingSlideId !== selectedPresentation?.slides[selectedPresentation.slides.length - 1]?.id && (
                    <div className={styles.dropIndicator} />
                )}
            </div>
        </div>
    );
};

export default SlideList;