import TextEditPanel from "../../EditPanels/TextEditPanel/TextEditPanel.tsx";
import CreateElementButtons from "../../EditPanels/CreateElementButtons/CreateElementButtons.tsx";
import RotationEditPanel from "../../EditPanels/RotationEditPanel/RotationEditPanel.tsx";

const HomePanel = () => {
    return (
        <>
            <CreateElementButtons/>
            <RotationEditPanel/>
            <TextEditPanel/>
        </>
    );
};

export default HomePanel;