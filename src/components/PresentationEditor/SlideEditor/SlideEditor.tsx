import styles from './SlideEditor.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../../../store/store.ts";
import ShapeElement from "./elements/ShapeElement.tsx";
import ImageElement from "./elements/ImageElement.tsx";
import TextElement from "./elements/TextElement.tsx";
import {deselectElement} from "../../../store/actions.ts";

const SlideEditor = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedPresentation = useSelector((state: appState) =>
        state.presentations.find(p => p.id === selectedPresentationId)
    );
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);

    const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const clickedOnElement = (e.target as HTMLElement).closest('.element');
        if (!clickedOnElement) {
            dispatch(deselectElement());
        }
    };

    return (
        <div className={styles.slideEditorWrapper}>
            <div
                className={styles.slideEditor}
                onMouseDown={handleEditorClick}
                style={{backgroundColor: `${selectedSlide ? selectedSlide.backgroundColor : '#ffffff'}`}}
            >
                {selectedSlide && selectedSlide.elements.map(el => {
                    switch (el.type) {
                        case 'text':
                            return (
                                <TextElement
                                    key={el.id}
                                    element={el}
                                />
                            );
                        case 'image':
                            return (
                                <ImageElement
                                    key={el.id}
                                    element={el}
                                />
                            );
                        case 'rectangle':
                        case 'circle':
                        case 'line':
                            return (
                                <ShapeElement
                                    key={el.id}
                                    element={el}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default SlideEditor;