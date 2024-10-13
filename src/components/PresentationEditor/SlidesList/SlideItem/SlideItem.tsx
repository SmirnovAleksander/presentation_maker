import styles from './SlideItem.module.css'
import {Slide} from "../../../../store/types.ts";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../../../../store/store.ts";
import {deleteSlide, selectSlide} from "../../../../store/actions.ts";
import deleteIcon from "../../../../assets/delete.svg";

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
    const handleDeleteSlide = (slideId: number) => {
        if (selectedPresentationId) {
            dispatch(deleteSlide(selectedPresentationId, slideId));
        }
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
                style={{backgroundColor: `${slide.backgroundColor}`,}}
            >
                <div className={styles.slideItemPlaceholder}>{slide.id}</div>
            </div>
        </div>
    );
};

export default SlideItem;