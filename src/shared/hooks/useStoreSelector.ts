import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, appState } from "@/app/store/store.ts";
import {updateElement, addElement, selectElement, updateSlide, updateAllSlidesBackground} from "@/app/store/actions.ts";
import {ElementProps, ImageElement, ShapeElement, TextElement} from "@/shared/types/types.ts";

const useStoreSelector = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);

    const presentations = useSelector((state: appState) => state.present.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const updateSelectedElement = (updates: Partial<TextElement | ImageElement | ShapeElement>) => {
        if (selectedElement) {
            dispatch(updateElement(selectedElement.id, updates));
        }
    };

    const addNewElement = (element: ElementProps) => {
        if (selectedSlide) {
            dispatch(addElement(element));
        }
    };

    const selectElementAction = (elementId: number) => {
        if (selectedSlide) {
            dispatch(selectElement(elementId));
        }
    };

    const updateSelectedSlide = (backgroundColor: string) => {
        if (selectedSlide) {
            dispatch(updateSlide(selectedSlide.id, backgroundColor));
        }
    };

    const updateAllSlidesBackgroundAction = (backgroundImage: string) => {
        if (selectedSlide) {
            dispatch(updateAllSlidesBackground(backgroundImage));
        }
    }

    return {
        selectedElement,
        presentations,
        selectedPresentation,
        selectedSlide,
        selectedPresentationId,
        selectedElementId,
        selectedSlideId,
        updateSelectedElement,
        addNewElement,
        selectElementAction,
        updateSelectedSlide,
        updateAllSlidesBackgroundAction
    };
};

export default useStoreSelector;