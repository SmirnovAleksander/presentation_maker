import styles from './SlideEditor.module.css';
import ShapeElement from "./elements/ShapeElement.tsx";
import ImageElement from "./elements/ImageElement.tsx";
import TextElement from "./elements/TextElement.tsx";
import { useRef } from "react";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { useCreateElements } from '@/shared/hooks/useCreateElements.ts';
import { toSvg } from 'html-to-image';

const SlideEditor = () => {
    const {
        selectedElementId,
        selectedSlide,
        deselectElementAction,
    } = useStoreSelector();
    const { createImageElement } = useCreateElements();

    const slideRef = useRef<HTMLDivElement>(null);

    const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const clickedOnElement = (e.target as HTMLElement).closest('.element');
        if (!clickedOnElement && selectedElementId) {
            deselectElementAction();
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    createImageElement(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDownload = async () => {
        if (slideRef.current) {
            try {
                const svgDataUrl = await toSvg(slideRef.current);
                const link = document.createElement('a');
                link.href = svgDataUrl;
                link.download = 'slide.svg';
                link.click();
            } catch (error) {
                console.error('Error generating SVG:', error);
            }
        }
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
            <button onClick={handleDownload} className={styles.downloadButton}>
                Download as SVG
            </button>
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
    );
};

export default SlideEditor;
