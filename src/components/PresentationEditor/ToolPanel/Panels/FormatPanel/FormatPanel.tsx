import ShapeEditPanel from "../../EditPanels/ShapeEditPanel/ShapeEditPanel.tsx";
import ColorEditPanel from "../../EditPanels/ColorEditPanel/ColorEditPanel.tsx";
import TextColorEditPanel from "../../EditPanels/TextColorEditPanel/TextColorEditPanel.tsx";
import ImageEditPanel from "../../EditPanels/ImageEditPanel/ImageEditPanel.tsx";

const FormatPanel = () => {
    return (
        <div>
            <ShapeEditPanel/>
            <ColorEditPanel/>
            <TextColorEditPanel/>
            <ImageEditPanel/>
        </div>
    );
};

export default FormatPanel;