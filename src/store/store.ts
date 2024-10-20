import {create} from 'zustand';
import {ElementProps, ImageElement, Presentation, ShapeElement, Slide, TextElement} from "./types.ts";
import {devtools, persist} from "zustand/middleware";

export interface EditorState {
    presentations: Presentation[];
    selectedPresentationId: number | null;
    selectedSlideId: number | null;
    selectedElementId: number | null;
}

interface Actions {
    moveSlideUp: (slideId: number) => void;
    moveSlideDown: (slideId: number) => void;
    addPresentation: (presentation: Presentation) => void;
    deletePresentation: (id: number) => void;
    updatePresentationTitle: (id: number, title: string) => void;
    selectPresentation: (presentationId: number) => void;
    addSlide: (slide: Slide) => void;
    selectSlide: (slideId: number) => void;
    deleteSlide: (slideId: number) => void;
    updateSlideBackground: (backgroundImage: string) => void;
    updateSlide: (id: number, backgroundColor: string) => void;
    addElement: (element: ElementProps) => void;
    deleteElement: (id: number) => void;
    selectElement: (id: number | null) => void;
    updateElement: (id: number, updates: Partial<TextElement | ImageElement | ShapeElement>) => void;
    deselectElement: () => void;
}

const useEditorStore = create<EditorState & Actions>()(
    devtools(
        persist(
            (set) => ({
                presentations: [],
                selectedPresentationId: null,
                selectedSlideId: null,
                selectedElementId: null,

                moveSlideUp: (slideId) =>
                    set((state) => {
                        const presentation = state.presentations.find((p) => p.id === state.selectedPresentationId);
                        if (presentation) {
                            const slideIndex = presentation.slides.findIndex((slide) => slide.id === slideId);
                            if (slideIndex > 0) {
                                const newSlides = [...presentation.slides];
                                const [movedSlide] = newSlides.splice(slideIndex, 1);
                                newSlides.splice(slideIndex - 1, 0, movedSlide);
                                return {
                                    presentations: state.presentations.map((p) =>
                                        p.id === state.selectedPresentationId ? { ...p, slides: newSlides } : p
                                    ),
                                };
                            }
                        }
                        return state;
                    }),

                moveSlideDown: (slideId) =>
                    set((state) => {
                        const presentation = state.presentations.find((p) => p.id === state.selectedPresentationId);
                        if (presentation) {
                            const slideIndex = presentation.slides.findIndex((slide) => slide.id === slideId);
                            if (slideIndex < presentation.slides.length - 1) {
                                const newSlides = [...presentation.slides];
                                const [movedSlide] = newSlides.splice(slideIndex, 1);
                                newSlides.splice(slideIndex + 1, 0, movedSlide);
                                return {
                                    presentations: state.presentations.map((p) =>
                                        p.id === state.selectedPresentationId ? { ...p, slides: newSlides } : p
                                    ),
                                };
                            }
                        }
                        return state;
                    }),

                addPresentation: (presentation) =>
                    set((state) => ({
                        presentations: [...state.presentations, presentation],
                        selectedPresentationId: presentation.id,
                    })),

                deletePresentation: (id) =>
                    set((state) => ({
                        presentations: state.presentations.filter((presentation) => presentation.id !== id),
                        selectedPresentationId: state.selectedPresentationId === id ? null : state.selectedPresentationId
                    })),

                updatePresentationTitle: (id, title) =>
                    set((state) => ({
                        presentations: state.presentations.map((presentation) =>
                            presentation.id === id ? { ...presentation, title } : presentation
                        ),
                    })),

                selectPresentation: (id) => set(() => ({
                    selectedPresentationId: id,
                    selectedSlideId: null,
                    selectedElementId: null
                })),

                addSlide: (slide) =>
                    set((state) => ({
                        presentations: state.presentations.map((presentation) =>
                            presentation.id === state.selectedPresentationId
                                ? { ...presentation, slides: [...presentation.slides, slide] }
                                : presentation
                        ),
                        selectedSlideId: slide.id,
                    })),

                selectSlide: (slideId) => set(() => ({
                    selectedSlideId: slideId,
                    selectedElementId: null,
                })),

                deleteSlide: (slideId) =>
                    set((state) => ({
                        presentations: state.presentations.map((presentation) =>
                            presentation.id === state.selectedPresentationId
                                ? { ...presentation, slides: presentation.slides.filter((slide) => slide.id !== slideId) }
                                : presentation
                        ),
                        selectedSlideId: state.selectedSlideId === slideId ? null : state.selectedSlideId,
                    })),

                updateSlideBackground: (backgroundImage) => set((state) => ({
                    presentations: state.presentations.map(presentation =>
                        presentation.id === state.selectedPresentationId
                            ? {
                                ...presentation,
                                slides: presentation.slides.map(slide => ({
                                    ...slide,
                                    backgroundImage,
                                })),
                            }
                            : presentation
                    )
                })),

                updateSlide: (id, backgroundColor) => set((state) => ({
                    presentations: state.presentations.map(presentation =>
                        presentation.id === state.selectedPresentationId
                            ? {
                                ...presentation,
                                slides: presentation.slides.map(slide =>
                                    slide.id === id ? { ...slide, backgroundColor } : slide
                                ),
                            }
                            : presentation
                    )
                })),

                addElement: (element) => set((state) => ({
                    presentations: state.presentations.map(presentation =>
                        presentation.id === state.selectedPresentationId
                            ? {
                                ...presentation,
                                slides: presentation.slides.map(slide =>
                                    slide.id === state.selectedSlideId ? { ...slide, elements: [...slide.elements, element] } : slide
                                ),
                            }
                            : presentation
                    )
                })),

                deleteElement: (id) => set((state) => ({
                    presentations: state.presentations.map(presentation =>
                        presentation.id === state.selectedPresentationId
                            ? {
                                ...presentation,
                                slides: presentation.slides.map(slide =>
                                    slide.id === state.selectedSlideId
                                        ? { ...slide, elements: slide.elements.filter(el => el.id !== id) }
                                        : slide
                                ),
                            }
                            : presentation
                    ),
                    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
                })),

                selectElement: (id) => set(() => ({
                    selectedElementId: id,
                })),

                updateElement: (id, updates) => set((state) => ({
                    presentations: state.presentations.map(presentation =>
                        presentation.id === state.selectedPresentationId
                            ? {
                                ...presentation,
                                slides: presentation.slides.map(slide =>
                                    slide.id === state.selectedSlideId
                                        ? {
                                            ...slide,
                                            elements: slide.elements.map(el => {
                                                    if (el.id === id) {
                                                        if (el.type === 'text') {
                                                            return { ...el, ...updates as Partial<TextElement> };
                                                        } else if (el.type === 'image') {
                                                            return { ...el, ...updates as Partial<ImageElement> };
                                                        } else if (el.type === 'rectangle' || el.type === 'circle' || el.type === 'line') {
                                                            return { ...el, ...updates as Partial<ShapeElement> };
                                                        }
                                                    }
                                                    return el;
                                                }
                                            ),
                                        }
                                        : slide
                                ),
                            }
                            : presentation
                    )
                })),

                deselectElement: () => set(() => ({
                    selectedElementId: null
                })),
            }), {
                name: 'presentations',
            })
    )
);

export default useEditorStore;