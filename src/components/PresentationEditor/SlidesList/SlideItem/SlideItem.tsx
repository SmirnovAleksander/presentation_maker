import styles from './SlideItem.module.css'
import {Slide} from "../../../../store/types.ts";
import React from "react";
import deleteIcon from "../../../../assets/delete.svg";
import RenderSlideItemElements from "../RenderSlideItemElements.tsx";
import CustomButton from "../../../UI/CustomButton/CustomButton.tsx";
import useEditorStore from "../../../../store/store.ts";

interface SlideItemProps {
    slide: Slide,
    slideIndex: number;
}

const SlideItem: React.FC<SlideItemProps> = ({slide, slideIndex}) => {
    const {presentations, selectedPresentationId, selectedSlideId, selectSlide, deleteSlide, moveSlideUp, moveSlideDown} = useEditorStore();
    const isSelected = selectedSlideId === slide.id;
    const selectedPresentation = presentations.find(p => p.id === selectedPresentationId);

    const handleSlideClick = () => {
        if (selectedPresentationId) {
            selectSlide(slide.id);
        }
    };
    const handleDeleteSlide = (slideId: number) => {
        if (selectedPresentationId) {
            deleteSlide(slideId);
        }
    };
    const handleMoveSlideUp = () => {
        if (selectedPresentationId) {
           moveSlideUp(slide.id);
        }
    };
    const handleMoveSlideDown = () => {
        if (selectedPresentationId) {
            moveSlideDown(slide.id);
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