import InsertImagePanel from "../../EditPanels/InsertImagePanel/InsertImagePanel.tsx";
import {appState} from "../../../../../store/store.ts";
import {useSelector} from "react-redux";
import CustomButton from "../../../../UI/CustomButton/CustomButton.tsx";


const InsertPanel = () => {
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const presentations = useSelector((state: appState) => state.present.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);

    const handleExport = () => {
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
            <CustomButton onClick={handleExport}>Экспорт в JSON</CustomButton>
            <InsertImagePanel/>
        </>
    );
};

export default InsertPanel;