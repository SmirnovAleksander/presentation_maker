import styles from './SlideEditor.module.css'
import ShapeElement from "./elements/ShapeElement.tsx";
import ImageElement from "./elements/ImageElement.tsx";
import TextElement from "./elements/TextElement.tsx";
import {useRef} from "react";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { useCreateElements } from '@/shared/hooks/useCreateElements.ts';

const SlideEditor = () => {
    const {
        selectedElementId,
        selectedSlide,
        selectedSlideId,
        deselectElementAction,
    } = useStoreSelector();
    const {createImageElement} = useCreateElements();
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
                    createImageElement(event.target.result as string)
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