import styles from './SlideItem.module.css'
import React, {DragEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import deleteIcon from "@/assets/delete.svg";
import RenderSlideItemElements from "../RenderSlideItemElements.tsx";
import {Slide} from "@/app/store/types.ts";
import {AppDispatch, appState} from "@/app/store/store.ts";
import {deleteSlide, moveSlideDown, moveSlideUp, selectSlide} from "@/app/store/actions.ts";
import CustomButton from "@/shared/ui/CustomButton/CustomButton.tsx";

interface SlideItemProps {
    slide: Slide;
    slideIndex: number;
    onDragStart: (slideId: number) => void;
    onDragEnd: () => void;
}

const SlideItem: React.FC<SlideItemProps> = ({slide, slideIndex, onDragStart, onDragEnd}) => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const isSelected = selectedSlideId === slide.id;
    const selectedPresentation  = useSelector((state: appState) =>
        state.present.presentations.find(p => p.id === selectedPresentationId)
    );


    const handleSlideClick = () => {
        if (selectedPresentationId) {
            dispatch(selectSlide(slide.id));
        }
    };
    const handleDeleteSlide = (slideId: number) => {
        if (selectedPresentationId) {
            dispatch(deleteSlide(slideId));
        }
    };
    const handleMoveSlideUp = () => {
        if (selectedPresentationId) {
            dispatch(moveSlideUp(slide.id));
        }
    };
    const handleMoveSlideDown = () => {
        if (selectedPresentationId) {
            dispatch(moveSlideDown(slide.id));
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
                <div
                    className={styles.deleteIconContainer}
                    onClick={() => handleDeleteSlide(slide.id)}
                >
                    <img
                        src={deleteIcon}
                        alt="X"
                        className={styles.deleteIcon}
                        width={20}
                        height={20}
                    />
                </div>
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