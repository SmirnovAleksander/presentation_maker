import CustomButton from "../../../../../UI/CustomButton/CustomButton.tsx";
import {Slide} from "../../../../../../store/types.ts";
import styles from './SlidesModal.module.css'
import RenderSlideItemElements from "../../../../SlidesList/RenderSlideItemElements.tsx";
import React from "react";
import {useSelector} from "react-redux";
import {appState} from "../../../../../../store/store.ts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SlidesModalInterface {
    slides: Slide[],
    onClose: () => void,
}

const SlidesModal: React.FC<SlidesModalInterface> = ({ slides, onClose }) => {

    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedPresentation = useSelector((state: appState) =>
        state.present.presentations.find(p => p.id === selectedPresentationId)
    );

    const handleExportToPDF = async () => {
        if (!selectedPresentation) return;

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });

        for (let i = 0; i < selectedPresentation.slides.length; i++) {
            const slide = selectedPresentation.slides[i];
            const slideRef = document.querySelector(`#slide-${slide.id}`);

            if (slideRef) {
                const canvas = await html2canvas(slideRef as HTMLElement, {
                    scale: 2,
                    useCORS: true,
                });
                const imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, "PNG", 10, 10, 277, 155);

                const pageNumber = `Slide ${i + 1} of ${selectedPresentation.slides.length}`;

                doc.setFontSize(10);
                doc.text(pageNumber, 148.5, 200, { align: 'center' });

                if (i < selectedPresentation.slides.length - 1) {
                    doc.addPage();
                }
            }
        }
        doc.save(`${selectedPresentation.title || 'presentation'}.pdf`);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.slidesContent}>
                <div className={styles.slidesContainer}>
                    {slides.map((slide, index) => (
                        <div key={slide.id} className={styles.slideWithNumberWrapper}>
                            <div className={styles.slideNumber}>Slide {index + 1}</div>
                            <div
                                id={`slide-${slide.id}`}
                                className={styles.slideWrapper}
                                style={{
                                    backgroundColor: slide?.backgroundImage
                                        ? 'transparent'
                                        : slide?.backgroundColor || '#ffffff',
                                    backgroundImage: slide?.backgroundImage
                                        ? `url(${slide.backgroundImage})`
                                        : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <RenderSlideItemElements slide={slide} multiplier={1.43}/>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.slidesButtons}>
                    <CustomButton onClick={onClose}>
                        Закрыть
                    </CustomButton>
                    <CustomButton onClick={handleExportToPDF}>
                        Экспорт в PDF
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default SlidesModal;