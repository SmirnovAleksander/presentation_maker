export interface Presentation {
    id: number;
    title: string;
    slides: Slide[];
}

export interface Slide {
    id: number;
    elements: ElementProps[];
    backgroundColor: string;
    backgroundImage?: string;
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
    backgroundColor: string;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    textTransform: 'none' | 'uppercase';
    alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface ImageElement {
    id: number;
    type: 'image';
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    rotation: number;
    borderColor?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
    borderWidth?: number;
    borderRadius?: number;
    boxShadow?: string;
    opacity?: number;
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
    opacity: number;
    boxShadow: string;
    borderColor: string;
    borderStyle: 'solid' | 'dashed' | 'dotted';
    borderWidth: number;
    gradient: string;
    fillType: 'solid' | 'gradient';
}

export type ElementProps = TextElement | ImageElement | ShapeElement;
