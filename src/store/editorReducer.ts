import {ImageElement, Presentation, ShapeElement, TextElement} from "./types.ts";
import {ElementActions} from "./actions.ts";

export interface EditorState {
    presentations: Presentation[];
    selectedPresentationId: number | null;
    selectedSlideId: number | null;
    selectedElementId: number | null;
}
const initialState: EditorState = {
    presentations: [],
    selectedPresentationId: null,
    selectedSlideId: null,
    selectedElementId: null,
};
const editorReducer = (state = initialState, action: ElementActions): EditorState  => {
    switch (action.type) {
        case 'ADD_PRESENTATION': {
            return {
                ...state,
                presentations: [...state.presentations, action.payload],
            };
        }
        case 'DELETE_PRESENTATION': {
            const updatedPresentations = state.presentations.filter(presentation => presentation.id !== action.payload);
            return {
                ...state,
                presentations: updatedPresentations,
            };
        }
        case 'UPDATE_PRESENTATION_TITLE': {
            return {
                ...state,
                presentations: state.presentations.map(presentation =>
                    presentation.id === action.payload.id
                        ? { ...presentation, title: action.payload.title }
                        : presentation
                ),
            };
        }
        case 'SELECT_PRESENTATION': {
            return {
                ...state,
                selectedPresentationId: action.payload,
                selectedSlideId: null,
                selectedElementId: null,
            };
        }
        case 'ADD_SLIDE' : {
            return {
                ...state,
                presentations: state.presentations.map(presentation => {
                    if (presentation.id === action.payload.presentationId) {
                        return {
                            ...presentation,
                            slides: [...presentation.slides, action.payload.slide],
                        };
                    }
                    return presentation;
                }),
                selectedSlideId: action.payload.slide.id,
            }
        }
        case 'SELECT_SLIDE': {
            return {
                ...state,
                selectedSlideId: action.payload.slideId,
            };
        }
        case 'DELETE_SLIDE': {
            return {
                ...state,
                presentations: state.presentations.map(presentation => {
                    if (presentation.id === action.payload.presentationId) {
                        return {
                            ...presentation,
                            slides: presentation.slides.filter(slide => slide.id !== action.payload.slideId),
                        };
                    }
                    return presentation;
                }),
                selectedSlideId: state.selectedSlideId === action.payload.slideId ? null : state.selectedSlideId,
            };
        }
        case 'ADD_ELEMENT': {
            return {
                ...state,
                presentations: state.presentations.map(presentation => {
                    if (presentation.id === action.payload.presentationId) {
                        return {
                            ...presentation,
                            slides: presentation.slides.map(slide => {
                                if (slide.id === action.payload.slideId) {
                                    return {
                                        ...slide,
                                        elements: [...slide.elements, action.payload.element],
                                    };
                                }
                                return slide;
                            }),
                        };
                    }
                    return presentation;
                }),
            };
        }
        case 'SELECT_ELEMENT':
            return {
                ...state,
                selectedElementId: action.payload,
            };
        case 'DESELECT_ELEMENT':
            return {
                ...state,
                selectedElementId: null,
            };
        case 'UPDATE_ELEMENT': {
            return {
                ...state,
                presentations: state.presentations.map(presentation => {
                    if (presentation.id === state.selectedPresentationId) {
                        return {
                            ...presentation,
                            slides: presentation.slides.map(slide => {
                                if (slide.id === state.selectedSlideId) {
                                    return {
                                        ...slide,
                                        elements: slide.elements.map(el => {
                                            if (el.id === action.payload.id) {
                                                if (el.type === 'text') {
                                                    return { ...el, ...action.payload.updates as Partial<TextElement> };
                                                } else if (el.type === 'image') {
                                                    return { ...el, ...action.payload.updates as Partial<ImageElement> };
                                                } else if (el.type === 'rectangle' || el.type === 'circle' || el.type === 'line') {
                                                    return { ...el, ...action.payload.updates as Partial<ShapeElement> };
                                                }
                                            }
                                            return el;
                                        }),
                                    };
                                }
                                return slide;
                            }),
                        };
                    }
                    return presentation;
                }),
            };
        }
        case 'DELETE_ELEMENT': {
            return {
                ...state,
                presentations: state.presentations.map(presentation => {
                    if (presentation.id === state.selectedPresentationId) {
                        return {
                            ...presentation,
                            slides: presentation.slides.map(slide => {
                                if (slide.id === state.selectedSlideId) {
                                    return {
                                        ...slide,
                                        elements: slide.elements.filter(el => el.id !== action.payload),
                                    };
                                }
                                return slide;
                            }),
                        };
                    }
                    return presentation;
                }),
                selectedElementId: state.selectedElementId === action.payload ? null : state.selectedElementId,
            };
        }
        default:
            return state;
    }
}

export default editorReducer;