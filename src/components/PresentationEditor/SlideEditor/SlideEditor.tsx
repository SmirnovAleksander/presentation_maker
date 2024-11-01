import styles from './SlideEditor.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../../../store/store.ts";
import ShapeElement from "./elements/ShapeElement.tsx";
import ImageElement from "./elements/ImageElement.tsx";
import TextElement from "./elements/TextElement.tsx";
import {ImageElement as ImageElementProps, TextElement as TextElementProps} from '../../../store/types.ts'
import {addElement, deselectElement} from "../../../store/actions.ts";

const SlideEditor = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const selectedPresentation = useSelector((state: appState) =>
        state.present.presentations.find(p => p.id === selectedPresentationId)
    );
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);

    const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const clickedOnElement = (e.target as HTMLElement).closest('.element');
        if (!clickedOnElement && selectedElementId) {
            dispatch(deselectElement());
        }
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const newImageElement: ImageElementProps = {
                        id: Date.now(),
                        type: 'image',
                        content: event.target.result as string,
                        position: { x: e.clientX - 250, y: e.clientY - 250},
                        size: { width: 100, height: 100 },
                        rotation: 0,
                        borderColor: '#000000',
                        borderStyle: 'solid',
                        borderWidth: 0,
                        borderRadius: 0,
                        boxShadow: 'none',
                        opacity: 1,
                    };
                    dispatch(addElement(newImageElement));
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handlePaste = (event: React.ClipboardEvent) => {
        const text = event.clipboardData.getData('text/plain');
        if (text) {
            const newElement: TextElementProps = {
                id: Date.now(), // или другой способ генерации уникального ID
                type: 'text',
                content: text,
                fontSize: 16,
                fontFamily: 'Arial',
                color: '#d21',
                position: { x: 100, y: 100 }, // можно установить по умолчанию или вычислять
                size: { width: 200, height: 50 }, // ширина и высота текста по умолчанию
                rotation: 0,
                backgroundColor: 'transparent',
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
                textTransform: 'none',
                alignment: 'left',
            };

            dispatch(addElement(newElement)); // Диспатч для добавления нового элемента
        }
    };


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const slideStyle = {
        backgroundColor: selectedSlide?.backgroundImage
            ? 'transparent'
            : selectedSlide?.backgroundColor || '#ffffff',
        backgroundImage: selectedSlide?.backgroundImage
            ? `url(${selectedSlide.backgroundImage})`
            : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    return (
        <div className={styles.slideEditorWrapper}>
            <div
                className={styles.slideEditor}
                onMouseDown={handleEditorClick}
                style={slideStyle}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onPaste={handlePaste}
                tabIndex={0}
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