import styles from './SlideList.module.css'
import SlideItem from "./SlideItem/SlideItem.tsx";
import {DragEvent, useState} from "react";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";

const SlideList = () => {
    const {
        selectedPresentation,
        moveSlideAction
    } = useStoreSelector();

    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [draggingSlideId, setDraggingSlideId] = useState<number | null>(null);
    const [selectedSlides, setSelectedSlides] = useState<number[]>([]);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!draggingSlideId) return;

        const dropY = e.clientY;
        const slideElements = document.querySelectorAll(`.${styles.slideDropZone}`);
        
        let newDragOverIndex = selectedPresentation!.slides.length;
        const currentIndex = selectedPresentation!.slides.findIndex(slide => slide.id === draggingSlideId);

        slideElements.forEach((element, index) => {
            const rectElement = element.getBoundingClientRect();
            const elementMiddle = rectElement.top + rectElement.height / 2;
            
            if (dropY < elementMiddle) {
                newDragOverIndex = Math.min(newDragOverIndex, index);
            }
        });

        if (newDragOverIndex === currentIndex || newDragOverIndex === currentIndex + 1) {
            setDragOverIndex(null);
        } else {
            setDragOverIndex(newDragOverIndex);
        }
    };

    const handleSlideClick = (slideId: number, e: React.MouseEvent) => {
        if (e.ctrlKey) {
            if (selectedSlides.length >= selectedPresentation!.slides.length - 1) {
                return;
            }
            setSelectedSlides(prev => 
                prev.includes(slideId) ? prev.filter(id => id !== slideId) : [...prev, slideId]
            );
        } else {
            setSelectedSlides([slideId]);
        }
    };

    const handleDragStart = (slideId: number) => {
        setDraggingSlideId(slideId);
        setSelectedSlides(prev => prev.includes(slideId) ? prev : [slideId]);
    };

    const handleDragEnd = () => {
        setDraggingSlideId(null);
        setDragOverIndex(null);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (dragOverIndex !== null && draggingSlideId) {
            const finalIndices = selectedSlides.map(slideId => {
                const currentIndex = selectedPresentation?.slides.findIndex(slide => slide.id === slideId);
                return currentIndex !== undefined && currentIndex !== -1
                    ? (currentIndex < dragOverIndex ? dragOverIndex - 1 : dragOverIndex)
                    : null;
            }).filter(index => index !== null);

            finalIndices.forEach((finalIndex, index) => {
                if (finalIndex !== null) {
                    moveSlideAction(selectedSlides[index], finalIndex);
                }
            });
        }
        setDragOverIndex(null);
        setDraggingSlideId(null);
        setSelectedSlides([]);
    };

    return (
        <div 
            className={styles.slideListWrapper}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {selectedPresentation && selectedPresentation.slides.map((slide, index) => (
                <div 
                    key={slide.id} 
                    className={styles.slideDropZone} 
                    onClick={(e) => handleSlideClick(slide.id, e)}
                >
                    {dragOverIndex === index && draggingSlideId !== slide.id && (
                        <div className={styles.dropIndicator} />
                    )}
                    <SlideItem
                        slide={slide}
                        slideIndex={index + 1}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        isSelected={selectedSlides.includes(slide.id)}
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