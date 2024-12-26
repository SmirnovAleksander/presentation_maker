import styles from './SlideList.module.css'
import {AppDispatch, appState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import SlideItem from "./SlideItem/SlideItem.tsx";
import {DragEvent, useState} from "react";
import {moveSlide} from "../../../store/actions.ts";

const SlideList = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedPresentation = useSelector((state: appState) =>
        state.present.presentations.find(p => p.id === selectedPresentationId)
    );
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dropY = e.clientY;
        const slideElements = document.querySelectorAll(`.${styles.slideDropZone}`);
        
        let newDragOverIndex = selectedPresentation!.slides.length;

        slideElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const elementMiddle = rect.top + rect.height / 2;
            
            if (dropY < elementMiddle) {
                newDragOverIndex = Math.min(newDragOverIndex, index);
            }
        });

        setDragOverIndex(newDragOverIndex);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const draggedSlideId = parseInt(e.dataTransfer.getData('slideId'));
        if (!isNaN(draggedSlideId) && dragOverIndex !== null) {
            const currentIndex = selectedPresentation?.slides.findIndex(slide => slide.id === draggedSlideId);
            if (currentIndex !== undefined && currentIndex !== -1) {
                const finalIndex = currentIndex < dragOverIndex ? dragOverIndex - 1 : dragOverIndex;
                dispatch(moveSlide(draggedSlideId, finalIndex));
            }
        }
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
                    {dragOverIndex === index && (
                        <div className={styles.dropIndicator} />
                    )}
                    <SlideItem
                        slide={slide}
                        slideIndex={index + 1}
                    />
                </div>
            ))}
            {/* Индикатор для вставки в конец списка */}
            {dragOverIndex === selectedPresentation?.slides.length && (
                <div className={styles.dropIndicator} />
            )}
        </div>
    );
};

export default SlideList;