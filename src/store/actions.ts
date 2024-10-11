import {ElementProps, ImageElement, Presentation, ShapeElement, Slide, TextElement} from "./types.ts";

export const ADD_PRESENTATION = 'ADD_PRESENTATION';
export const ADD_SLIDE = 'ADD_SLIDE';
export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const SELECT_ELEMENT = 'SELECT_ELEMENT';
export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';
export const DESELECT_ELEMENT = 'DESELECT_ELEMENT';
export const SELECT_SLIDE = 'SELECT_SLIDE';

export interface AddPresentationAction {
    type: typeof ADD_PRESENTATION;
    payload: Presentation;
}

export interface AddSlideAction {
    type: typeof ADD_SLIDE;
    payload: { presentationId: number, slide: Slide };
}

export interface SelectSlideAction {
    type: typeof SELECT_SLIDE;
    payload: { slideId: number, presentationId: number };
}

export interface AddElementAction {
    type: typeof ADD_ELEMENT;
    payload: TextElement | ImageElement | ShapeElement;
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
export type ElementActions =
    | AddElementAction
    | DeleteElementAction
    | SelectElementAction
    | UpdateElementAction
    | DeselectElementAction
    | AddPresentationAction
    | AddSlideAction
    | SelectSlideAction;

// Действия для презентаций и слайдов
export const addPresentation = (presentation: Presentation): AddPresentationAction => ({
    type: ADD_PRESENTATION,
    payload: presentation,
});

export const addSlide = (presentationId: number, slide: Slide): AddSlideAction => ({
    type: ADD_SLIDE,
    payload: {
        presentationId,
        slide
    },
});

export const selectSlide = (presentationId: number, slideId: number): SelectSlideAction => ({
    type: SELECT_SLIDE,
    payload: { presentationId, slideId }
});

// Действия для элементов
export const addElement = (element: ElementProps): AddElementAction => ({
    type: ADD_ELEMENT,
    payload: element,
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