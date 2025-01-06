import {useState} from "react";
import {CustomButton} from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import InsertImagePanel from "../../EditPanels/InsertImagePanel/InsertImagePanel";
import SlidesModal from "../../EditPanels/SlidesModal/SlidesModal";
import ImportImagePanel from "../../EditPanels/ImportImagePanel/ImportImagePanel";
import { BsFiletypeJson, BsFileEarmarkPdf } from "react-icons/bs";
import { CiImport } from "react-icons/ci";


const InsertPanel = () => {
    const {
        selectedPresentation,
    } = useStoreSelector();

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
            <CustomButton onClick={handleExportToJson} style={{flexDirection: "column", gap: 6}}>
                <BsFiletypeJson size={24} />
                <p>Экспорт в JSON</p>   
            </CustomButton>
            <CustomButton onClick={openModal} style={{flexDirection: "column", gap: 6}}>
                <BsFileEarmarkPdf size={24} />
                <p>Просмотр примера PDF</p>
            </CustomButton>
            <CustomButton onClick={openImagePanel} style={{flexDirection: "column", gap: 6, width: 200}}>
                <CiImport size={24} />
                <p>Импортировать картинку из Unsplash.com</p>
            </CustomButton>
            <InsertImagePanel/>
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