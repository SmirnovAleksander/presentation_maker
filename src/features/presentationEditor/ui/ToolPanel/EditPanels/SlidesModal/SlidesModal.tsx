import styles from './SlidesModal.module.css'
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {CustomButton} from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { Slide } from '@/shared/types/types.ts';
import RenderSlideItemElements from '@/features/presentationEditor/ui/SlidesList/RenderSlideItemElements';
import PptxGenJS from 'pptxgenjs';
import { BsFiletypePdf, BsFiletypePptx } from "react-icons/bs";

interface SlidesModalInterface {
    slides: Slide[],
    onClose: () => void,
}

const SlidesModal: React.FC<SlidesModalInterface> = ({ slides, onClose }) => {

    const {
        selectedPresentation,
    } = useStoreSelector();

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

    const handleExportToPPTX = async () => {
        if (!selectedPresentation) return;

        const pptx = new PptxGenJS();
        for (let i = 0; i < selectedPresentation.slides.length; i++) {
            const slide = selectedPresentation.slides[i];
            const slideRef = document.querySelector(`#slide-${slide.id}`);

            if (slideRef) {
                const canvas = await html2canvas(slideRef as HTMLElement, {
                    scale: 2,
                    useCORS: true,
                });
                const imgData = canvas.toDataURL('image/png');

                const pptSlide = pptx.addSlide();
                pptSlide.addImage({ data: imgData, x: 0, y: 0, w: '100%', h: '100%' });

                pptSlide.addText(`Slide ${i + 1} of ${selectedPresentation.slides.length}`, {
                    x: 4.5, y: 6.5, fontSize: 18, color: '000000', align: 'center'
                });
            }
        }

        pptx.writeFile({ fileName: `${selectedPresentation.title || 'presentation'}.pptx` });
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
                                    background: slide?.backgroundImage
                                        ? `url(${slide.backgroundImage})`
                                        : slide?.backgroundColor && slide.backgroundColor.includes('gradient')
                                            ? slide.backgroundColor
                                            : slide?.backgroundColor || '#ffffff',
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
                    <CustomButton onClick={handleExportToPDF} style={{flexDirection: "column", gap: 6}}>
                        <BsFiletypePdf size={34}/>
                        Экспорт в PDF
                    </CustomButton>
                    <CustomButton onClick={handleExportToPPTX} style={{flexDirection: "column", gap: 6}}>
                        <BsFiletypePptx  size={34}/>
                        Экспорт в PPTX
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default SlidesModal;