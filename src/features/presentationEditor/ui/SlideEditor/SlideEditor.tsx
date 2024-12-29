import styles from './SlideEditor.module.css'
import ShapeElement from "./elements/ShapeElement.tsx";
import ImageElement from "./elements/ImageElement.tsx";
import TextElement from "./elements/TextElement.tsx";
import {useRef} from "react";
import {ImageElement as ImageElementProps} from '@/shared/types/types.ts'
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";

const SlideEditor = () => {
    const {
        selectedElementId,
        selectedSlide,
        selectedSlideId,
        deselectElementAction,
        addNewElement
    } = useStoreSelector();

    const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const clickedOnElement = (e.target as HTMLElement).closest('.element');
        if (!clickedOnElement && selectedElementId) {
            deselectElementAction()
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
                    addNewElement(newImageElement);
                }
            };
            reader.readAsDataURL(file);
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
    const slideRef = useRef<HTMLDivElement>(null);
    console.log(selectedSlide?.backgroundImage);

    return (
        <div className={styles.slideEditorWrapper}>
            <div id={`slide-${selectedSlideId}`}>
                <div
                    className={styles.slideEditor}
                    onMouseDown={handleEditorClick}
                    style={slideStyle}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    tabIndex={0}
                    ref={slideRef}
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
        </div>
    );
};

export default SlideEditor;