import {ElementProps, ImageElement, Presentation, ShapeElement, Slide, TextElement} from "@/shared/types/types.ts";

export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const MOVE_SLIDE_UP = 'MOVE_SLIDE_UP';
export const MOVE_SLIDE_DOWN = 'MOVE_SLIDE_DOWN';

export const ADD_PRESENTATION = 'ADD_PRESENTATION';
export const DELETE_PRESENTATION = 'DELETE_PRESENTATION';
export const UPDATE_PRESENTATION_TITLE = 'UPDATE_PRESENTATION_TITLE';
export const SELECT_PRESENTATION = 'SELECT_PRESENTATION';

export const ADD_SLIDE = 'ADD_SLIDE';
export const SELECT_SLIDE = 'SELECT_SLIDE';
export const DELETE_SLIDE = 'DELETE_SLIDE';
export const UPDATE_SLIDE = 'UPDATE_SLIDE';
export const UPDATE_ALL_SLIDES_BACKGROUND_COLOR = 'UPDATE_ALL_SLIDES_BACKGROUND_COLOR';
export const UPDATE_ALL_SLIDES_BACKGROUND_IMAGE = 'UPDATE_ALL_SLIDES_BACKGROUND_IMAGE';

export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const SELECT_ELEMENT = 'SELECT_ELEMENT';
export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';
export const DESELECT_ELEMENT = 'DESELECT_ELEMENT';
export const MOVE_ELEMENT_TO_FRONT = 'MOVE_ELEMENT_TO_FRONT'
export const MOVE_ELEMENT_TO_BACK = 'MOVE_ELEMENT_TO_BACK'

export const MOVE_SLIDE = 'MOVE_SLIDE';

///////////////////////
export interface UndoAction {
    type: typeof UNDO;
}

export interface RedoAction {
    type: typeof REDO;
}
//////////////////////
export interface MoveSlideUpAction {
    type: typeof MOVE_SLIDE_UP;
    payload: { slideId: number; };
}

export interface MoveSlideDownAction {
    type: typeof MOVE_SLIDE_DOWN;
    payload: { slideId: number; };
}
////////////////////////
export interface AddPresentationAction {
    type: typeof ADD_PRESENTATION;
    payload: Presentation;
}
export interface DeletePresentationAction {
    type: typeof DELETE_PRESENTATION;
    payload: number;
}
export interface UpdatePresentationTitleAction {
    type: typeof UPDATE_PRESENTATION_TITLE;
    payload: { id: number; title: string };
}
export interface SelectPresentationAction {
    type: typeof SELECT_PRESENTATION;
    payload: number;
}
/////////////////////////////

export interface AddSlideAction {
    type: typeof ADD_SLIDE;
    payload: { slide: Slide };
}
export interface SelectSlideAction {
    type: typeof SELECT_SLIDE;
    payload: { slideId: number};
}
export interface DeleteSlideAction {
    type: typeof DELETE_SLIDE;
    payload: { slideId: number };
}
export interface UpdateAllSlidesBackgroundColorAction    {
    type: typeof UPDATE_ALL_SLIDES_BACKGROUND_COLOR;
    payload: { backgroundColor: string; };
}
export interface UpdateSlideAction {
    type: typeof UPDATE_SLIDE;
    payload: { id: number; backgroundColor: string; };
}

//////////////////////////////////

export interface AddElementAction {
    type: typeof ADD_ELEMENT;
    payload: {element: ElementProps};
}

export interface DeleteElementAction {
    type: typeof DELETE_ELEMENT;
    payload: number;
}

export interface SelectElementAction {
    type: typeof SELECT_ELEMENT;
    payload: number | null;
}

interface DeselectElementAction {
    type: typeof DESELECT_ELEMENT;
}

export interface UpdateElementAction {
    type: typeof UPDATE_ELEMENT;
    payload: {
        id: number;
        updates: Partial<TextElement | ImageElement | ShapeElement>;
    };
}

export interface MoveElementToFrontAction {
    type: typeof MOVE_ELEMENT_TO_FRONT;
    payload: number;
}

export interface MoveElementToBackAction {
    type: typeof MOVE_ELEMENT_TO_BACK;
    payload: number;
}


export interface MoveSlideAction {
    type: typeof MOVE_SLIDE;
    payload: {
        slideId: number;
        newIndex: number;
    };
}

export interface UpdateAllSlidesBackgroundImageAction {
    type: typeof UPDATE_ALL_SLIDES_BACKGROUND_IMAGE;
    payload: { backgroundImage: string; };
}

export type ElementActions =
    | MoveSlideAction
    | AddElementAction
    | DeleteElementAction
    | SelectElementAction
    | UpdateElementAction
    | DeselectElementAction
    | AddPresentationAction
    | AddSlideAction
    | SelectSlideAction
    | DeletePresentationAction
    | UpdatePresentationTitleAction
    | SelectPresentationAction
    | DeleteSlideAction
    | UpdateAllSlidesBackgroundColorAction
    | UpdateSlideAction
    | MoveSlideUpAction
    | MoveSlideDownAction
    | UndoAction
    | RedoAction
    | UpdateAllSlidesBackgroundImageAction
    | MoveElementToFrontAction
    | MoveElementToBackAction;

//Экшены

export const undo = (): UndoAction => ({
    type: UNDO
});
export const redo = (): RedoAction => ({
    type: REDO
});

////////////////////////////
export const moveSlideUp = (slideId: number): MoveSlideUpAction => ({
    type: MOVE_SLIDE_UP,
    payload: {slideId },
});

export const moveSlideDown = (slideId: number): MoveSlideDownAction => ({
    type: MOVE_SLIDE_DOWN,
    payload: {slideId },
});
///////////////////////////
export const addPresentation = (presentation: Presentation): AddPresentationAction => ({
    type: ADD_PRESENTATION,
    payload: presentation,
});
export const deletePresentation = (id: number) => ({
    type: DELETE_PRESENTATION,
    payload: id,
});
export const updatePresentationTitle = (id: number, title: string): UpdatePresentationTitleAction => ({
    type: UPDATE_PRESENTATION_TITLE,
    payload: { id, title },
});
export const selectPresentation = (presentationId: number): SelectPresentationAction => ({
    type: SELECT_PRESENTATION,
    payload: presentationId,
});

/////////////////////////////////

export const addSlide = ( slide: Slide): AddSlideAction => ({
    type: ADD_SLIDE,
    payload: {slide},
});
export const selectSlide = (slideId: number): SelectSlideAction => ({
    type: SELECT_SLIDE,
    payload: {slideId }
});
export const deleteSlide = (slideId: number): DeleteSlideAction => ({
    type: DELETE_SLIDE,
    payload: {slideId },
});
export const updateAllSlidesBackgroundColor = (backgroundColor: string): UpdateAllSlidesBackgroundColorAction => ({
    type: "UPDATE_ALL_SLIDES_BACKGROUND_COLOR",
    payload: { backgroundColor },
});
export const updateSlide = (id: number, backgroundColor: string): UpdateSlideAction => ({
        type: UPDATE_SLIDE,
        payload: { id, backgroundColor },
    });
//////////////////////////////////////////

// Действия для элементов
export const addElement = (element: ElementProps): AddElementAction => ({
    type: ADD_ELEMENT,
    payload: {element},
});

export const deleteElement = (id: number): DeleteElementAction => ({
    type: DELETE_ELEMENT,
    payload: id,
});

export const selectElement = (id: number | null): SelectElementAction => ({
    type: SELECT_ELEMENT,
    payload: id,
});

export const updateElement = (id: number, updates: Partial<TextElement | ImageElement | ShapeElement>): UpdateElementAction => ({
    type: UPDATE_ELEMENT,
    payload: { id, updates },
});

export const deselectElement = (): DeselectElementAction => ({
    type: DESELECT_ELEMENT,
});

export const moveElementToFront = (elementId: number): MoveElementToFrontAction => ({
    type: MOVE_ELEMENT_TO_FRONT,
    payload: elementId,
});

export const moveElementToBack = (elementId: number): MoveElementToBackAction => ({
    type: MOVE_ELEMENT_TO_BACK,
    payload: elementId,
});


export const moveSlide = (slideId: number, newIndex: number): MoveSlideAction => ({
    type: MOVE_SLIDE,
    payload: { slideId, newIndex }
});

export const updateAllSlidesBackgroundImage = (backgroundImage: string): UpdateAllSlidesBackgroundImageAction => ({
    type: UPDATE_ALL_SLIDES_BACKGROUND_IMAGE,
    payload: { backgroundImage },
});