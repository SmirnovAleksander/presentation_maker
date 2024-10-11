export interface Presentation {
    id: number;
    title: string;
    slides: Slide[];
}

export interface Slide {
    id: number;
    elements: ElementProps[];
    backgroundColor: string;
}

export interface TextElement {
    id: number;
    type: 'text';
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    fontSize: number;
    fontFamily: string;
    color: string;
    rotation: number;
}

export interface ImageElement {
    id: number;
    type: 'image';
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    rotation: number;
}

export interface ShapeElement {
    id: number;
    type: 'rectangle' | 'circle' | 'line';
    position: { x: number; y: number };
    size: { width: number; height: number };
    color: string;
    rotation: number;
    lineWidth?: number;
    borderRadius?: number;
}

export type ElementProps = TextElement | ImageElement | ShapeElement;
