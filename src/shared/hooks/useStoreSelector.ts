import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, appState } from "@/app/store/store.ts";
import {
    updateElement,
    addElement,
    selectElement,
    updateSlide,
    updateAllSlidesBackgroundColor,
    undo,
    redo,
    addSlide,
    moveSlide,
    selectSlide,
    deleteSlide,
    moveSlideUp,
    moveSlideDown,
    deselectElement, updatePresentationTitle, deleteElement,
    updateAllSlidesBackgroundImage,
} from "@/app/store/actions.ts";
import {ElementProps, ImageElement, ShapeElement, Slide, TextElement} from "@/shared/types/types.ts";

const useStoreSelector = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);

    const presentations = useSelector((state: appState) => state.present.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const pastLength = useSelector((state: appState) => state.past.length)
    const futureLength = useSelector((state: appState) => state.future.length)

    const updatePresentationTitleAction = (newTitle: string) => {
        if (selectedPresentation) {
            dispatch(updatePresentationTitle(selectedPresentation.id, newTitle));
        }
    }

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
    const deselectElementAction = () => {
        dispatch(deselectElement());
    }
    const selectElementAction = (elementId: number) => {
        if (selectedSlide) {
            dispatch(selectElement(elementId));
        }
    };
    const deleteElementAction = (elementId: number) => {
        if (selectedSlide) {
            dispatch(deleteElement(elementId));
        }
    };

    const updateSelectedSlide = (backgroundColor: string) => {
        if (selectedSlide) {
            dispatch(updateSlide(selectedSlide.id, backgroundColor));
        }
    };

    const updateAllSlidesBackgroundColorAction = (backgroundColor: string) => {
        if (selectedSlide) {
            dispatch(updateAllSlidesBackgroundColor(backgroundColor));
        }
    }

    const updateAllSlidesBackgroundImageAction = (backgroundColor: string) => {
        if (selectedSlide) {
            dispatch(updateAllSlidesBackgroundImage(backgroundColor));
        }
    }

    const undoAction = () => {
        dispatch(undo());
    }
    const redoAction = () => {
        dispatch(redo());
    }

    const addSlideAction = (newSlide: Slide) => {
        dispatch(addSlide(newSlide));
    }
    const moveSlideAction = (slideId: number, newIndex: number) => {
        dispatch(moveSlide(slideId, newIndex));
    }
    const selectSlideAction = (slideId: number) => {
        dispatch(selectSlide(slideId));
    }
    const deleteSlideAction = (slideId: number) => {
        dispatch(deleteSlide(slideId));
    }
    const moveSlideUpAction = (slideId: number) => {
        if (selectedSlide) {
            dispatch(moveSlideUp(slideId))
        }
    }
    const moveSlideDownAction = (slideId: number) => {
        if (selectedSlide) {
            dispatch(moveSlideDown(slideId))
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
        updateAllSlidesBackgroundColorAction,
        updateAllSlidesBackgroundImageAction,
        pastLength,
        futureLength,
        undoAction,
        redoAction,
        addSlideAction,
        moveSlideAction,
        selectSlideAction,
        deleteSlideAction,
        moveSlideUpAction,
        moveSlideDownAction,
        deselectElementAction,
        updatePresentationTitleAction,
        deleteElementAction
    };
};

export default useStoreSelector;