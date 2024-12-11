import styles from './SlideEditor.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../../../store/store.ts";
import ShapeElement from "./elements/ShapeElement.tsx";
import ImageElement from "./elements/ImageElement.tsx";
import TextElement from "./elements/TextElement.tsx";
import {ImageElement as ImageElementProps} from '../../../store/types.ts'
import {addElement, deselectElement} from "../../../store/actions.ts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {useRef} from "react";

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
    const handleExportToPDF = async () => {
        if (slideRef.current) {
            const canvas = await html2canvas(slideRef.current,  {
                scale: 2,
                useCORS: true,
            });
            const imgData = canvas.toDataURL("image/png");

            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
            });
            doc.addImage(imgData, "PNG", 10, 10, 277, 155);
            doc.save("slide.pdf");
        }
    };
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
            <button onClick={handleExportToPDF}>Экспорт в PDF</button>
        </div>
    );
};

export default SlideEditor;