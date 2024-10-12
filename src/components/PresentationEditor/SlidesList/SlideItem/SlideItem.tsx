import styles from './SlideItem.module.css'
import {Slide} from "../../../../store/types.ts";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../../../../store/store.ts";
import {selectSlide} from "../../../../store/actions.ts";

interface SlideItemProps {
    slide: Slide,
    slideIndex: number;
}

const SlideItem: React.FC<SlideItemProps> = ({slide, slideIndex}) => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId)
    const isSelected = selectedSlideId === slide.id;
    const handleSlideClick = () => {
        if (selectedPresentationId) {
            dispatch(selectSlide(selectedPresentationId ,slide.id));
        }
    };
    return (
        <div
            className={styles.slideItemWrapper}
            onClick={handleSlideClick}
        >
            <p className={styles.slideItemNumber}>{slideIndex}</p>
            <div
                className={`${styles.slideItem} ${isSelected && styles.slideItemSelected}`}
                style={{backgroundColor: `${slide.backgroundColor}`,}}
            >
                <div className={styles.slideItemPlaceholder}>Слайд</div>
            </div>
        </div>
    );
};

export default SlideItem;