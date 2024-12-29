import InsertImagePanel from "../../EditPanels/InsertImagePanel/InsertImagePanel.tsx";
import {appState} from "../../../../../../app/store/store.ts";
import {useSelector} from "react-redux";
import {useState} from "react";
import SlidesModal from "./SlidesModal/SlidesModal.tsx";
import ImportImagePanel from "./ImportImagePanel/ImportImagePanel.tsx";
import {CustomButton} from "@/shared/ui";

const InsertPanel = () => {
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const presentations = useSelector((state: appState) => state.present.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const closeImagePanel = () => setIsImageModalOpen(false);
    const openImagePanel = () => setIsImageModalOpen(true);

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

    return (
        <>
            <CustomButton onClick={handleExportToJson}>Экспорт в JSON</CustomButton>
            <InsertImagePanel/>
            <CustomButton onClick={openModal}>Просмотр примера PDF</CustomButton>
            <CustomButton onClick={openImagePanel}>Импортировать картинку</CustomButton>
            {isModalOpen && selectedPresentation && (
                <SlidesModal slides={selectedPresentation.slides} onClose={closeModal}/>
            )}
            {isImageModalOpen && (
                <ImportImagePanel onClose={closeImagePanel}/>
            )}
        </>
    );
};

export default InsertPanel;