import GradientEditPanel from "../../EditPanels/GradientEditPanel/GradientEditPanel.tsx";
import SlideEditBackground from "../../EditPanels/SlideEditBackground/SlideEditBackground.tsx";
import ThemeEditPanel from "../../EditPanels/ThemeEditPanel/ThemeEditPanel.tsx";

const SlideDesignPanel = () => {
    return (
        <>
            <SlideEditBackground/>
            <ThemeEditPanel/>
            <GradientEditPanel/>
        </>
    );
};

export default SlideDesignPanel;