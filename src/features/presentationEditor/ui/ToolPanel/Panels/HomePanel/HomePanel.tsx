import CreateElementButtons
    from "@/features/presentationEditor/ui/ToolPanel/EditPanels/CreateElementButtons/CreateElementButtons.tsx";
import RotationEditPanel
    from "@/features/presentationEditor/ui/ToolPanel/EditPanels/RotationEditPanel/RotationEditPanel.tsx";
import TextEditPanel from "@/features/presentationEditor/ui/ToolPanel/EditPanels/TextEditPanel/TextEditPanel.tsx";

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