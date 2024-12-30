import styles from './SlideItem.module.css'
import React, {DragEvent} from "react";
import RenderSlideItemElements from "../RenderSlideItemElements.tsx";
import {Slide} from "@/shared/types/types.ts";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import {CustomButton, DeleteButton} from "@/shared/ui";

interface SlideItemProps {
    slide: Slide;
    slideIndex: number;
    onDragStart: (slideId: number) => void;
    onDragEnd: () => void;
}

const SlideItem: React.FC<SlideItemProps> = ({slide, slideIndex, onDragStart, onDragEnd}) => {
    const {
        selectedPresentation,
        selectedPresentationId,
        selectedSlideId,
        selectSlideAction,
        deleteSlideAction,
        moveSlideUpAction,
        moveSlideDownAction,
    } = useStoreSelector();

    const isSelected = selectedSlideId === slide.id;

    const handleSlideClick = () => {
        if (selectedPresentationId) {
            selectSlideAction(slide.id);
        }
    };
    const handleDeleteSlide = (slideId: number) => {
        if (selectedPresentationId) {
            deleteSlideAction(slideId);
        }
    };
    const handleMoveSlideUp = () => {
        if (selectedPresentationId) {
            moveSlideUpAction(slide.id);
        }
    };
    const handleMoveSlideDown = () => {
        if (selectedPresentationId) {
            moveSlideDownAction(slide.id);
        }
    };
    const slideStyle = {
        backgroundColor: slide?.backgroundImage
            ? 'transparent'
            : slide?.backgroundColor || '#ffffff',
        backgroundImage: slide?.backgroundImage
            ? `url(${slide.backgroundImage})`
            : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.dataTransfer.setData('slideId', slide.id.toString());
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.classList.add('dragging');
        onDragStart(slide.id);
    };

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('dragging');
        onDragEnd();
    };

    return (
        <div
            className={styles.slideItemWrapper}
            onClick={handleSlideClick}
        >
            <div className={styles.slideToolWrapper}>
                <p className={styles.slideItemNumber}>{slideIndex}</p>
                <DeleteButton
                    handleDeleteElement={handleDeleteSlide}
                    elementId={slide.id}
                />
            </div>
            <div
                className={`${styles.slideItem} ${isSelected && styles.slideItemSelected}`}
                style={slideStyle}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <RenderSlideItemElements key={slide.id} slide={slide} multiplier={8} />
            </div>
            {isSelected && (
                <div className={styles.slideMoveButtons}>
                    <CustomButton
                        onClick={handleMoveSlideUp}
                        disabled={slideIndex === 1}
                        style={{backgroundColor: slideIndex === 1 ? 'rgba(0, 0, 0, 0.2)' : ''}}
                    >
                        ↑
                    </CustomButton>
                    <CustomButton
                        onClick={handleMoveSlideDown}
                        disabled={slideIndex === selectedPresentation!.slides.length}
                        style={{backgroundColor: slideIndex === selectedPresentation!.slides.length ? 'rgba(0, 0, 0, 0.2)' : ''}}
                    >
                        ↓
                    </CustomButton>
                </div>
            )}
        </div>
    );
};

export default SlideItem;