import styles from './SlideList.module.css'
import SlideItem from "./SlideItem/SlideItem.tsx";
import useEditorStore from "../../../store/store.ts";

const SlideList = () => {
    const {selectedPresentationId, presentations} = useEditorStore();
    const selectedPresentation = presentations.find(p => p.id === selectedPresentationId);
    return (
        <div className={styles.slideListWrapper}>
            {selectedPresentation && selectedPresentation.slides.map((slide, index) => (
                <SlideItem slide={slide} key={index} slideIndex={index + 1} />
            ))}
        </div>
    );
};

export default SlideList;