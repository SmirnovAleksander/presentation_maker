import styles from './SlideList.module.css'
import {appState} from "../../../store/store.ts";
import {useSelector} from "react-redux";
import SlideItem from "./SlideItem/SlideItem.tsx";

const SlideList = () => {
    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedPresentation  = useSelector((state: appState) =>
        state.presentations.find(p => p.id === selectedPresentationId)
    );
    return (
        <div className={styles.slideListWrapper}>
            {selectedPresentation && selectedPresentation.slides.map((slide, index) => (
                <SlideItem slide={slide} key={index} slideIndex={index + 1} />
            ))}
        </div>
    );
};

export default SlideList;