import InsertImagePanel from "../../EditPanels/InsertImagePanel/InsertImagePanel.tsx";
import {appState} from "../../../../../store/store.ts";
import {useSelector} from "react-redux";
import CustomButton from "../../../../UI/CustomButton/CustomButton.tsx";
import {useState} from "react";
import SlidesModal from "./SlidesModal/SlidesModal.tsx";

const InsertPanel = () => {
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const presentations = useSelector((state: appState) => state.present.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const handleExportToJson = () => {
        const dataStr = JSON.stringify(selectedPresentation, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedPresentation?.title}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    // const handleExportToPDF = async () => {
    //     if (!selectedPresentation) return;
    //
    //     const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    //
    //     for (const slide of selectedPresentation.slides) {
    //         const slideRef = document.querySelector(`#slide-${slide.id}`);
    //
    //         if (slideRef) {
    //             const canvas = await html2canvas(slideRef as HTMLElement, {
    //                 scale: 2,
    //                 useCORS: true,
    //             });
    //             const imgData = canvas.toDataURL('image/png');
    //
    //             const pageWidth = pdf.internal.pageSize.getWidth();
    //             const pageHeight = pdf.internal.pageSize.getHeight();
    //
    //             pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    //
    //             if (slide !== selectedPresentation.slides[selectedPresentation.slides.length - 1]) {
    //                 pdf.addPage();
    //             }
    //         }
    //     }
    //
    //     pdf.save(`${selectedPresentation.title || 'presentation'}.pdf`);
    // };

    return (
        <>
            <CustomButton onClick={handleExportToJson}>Экспорт в JSON</CustomButton>
            <InsertImagePanel/>
            <CustomButton onClick={openModal}>Просмотр примера PDF</CustomButton>
            {isModalOpen && selectedPresentation && (
                <SlidesModal slides={selectedPresentation.slides} onClose={closeModal}/>
            )}
        </>
    );
};

export default InsertPanel;