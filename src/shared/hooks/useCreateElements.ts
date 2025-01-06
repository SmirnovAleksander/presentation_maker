import useStoreSelector from "@/shared/hooks/useStoreSelector";
import {ImageElement, ShapeElement, TextElement} from "@/shared/types/types.ts";

export const useCreateElements = () => {
    const {
        selectedSlideId,
        addNewElement,
        selectElementAction
    } = useStoreSelector();

    const createTextElement = (content: string = 'Новый текст') => {
        const newTextElement: TextElement = {
            id: Date.now(),
            type: 'text',
            content,
            fontSize: 16,
            fontFamily: 'Arial',
            color: '#d21',
            position: { x: 100, y: 100 },
            size: { width: 200, height: 50 },
            rotation: 0,
            backgroundColor: 'transparent',
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
            textTransform: 'none',
            alignment: 'left',
            zIndex: 200
        };

        if (selectedSlideId) {
            addNewElement(newTextElement);
            selectElementAction(newTextElement.id)
        }
    };

    const createImageElement = (imageUrl: string) => {
        const img = new Image();
        img.src = imageUrl;
        
        img.onload = () => {
            const newImageElement: ImageElement = {
                id: Date.now(),
                type: 'image',
                content: imageUrl,
                position: { x: 150, y: 150 },
                size: (() => {
                    const maxSize = 300;
                    const ratio = img.naturalWidth / img.naturalHeight;
                    
                    if (img.naturalWidth > img.naturalHeight) {
                        return {
                            width: maxSize,
                            height: maxSize / ratio
                        };
                    } else {
                        return {
                            width: maxSize * ratio,
                            height: maxSize
                        };
                    }
                })(),
                rotation: 0,
                borderColor: '#000000',
                borderStyle: 'solid',
                borderWidth: 0,
                borderRadius: 0,
                boxShadow: 'none',
                opacity: 1,
                zIndex: 200
            };
    
            if (selectedSlideId) {
                addNewElement(newImageElement);
                selectElementAction(newImageElement.id)
            }
        };
    };

    const createShapeElement = (type: 'rectangle' | 'circle' | 'line') => {
        const newShapeElement: ShapeElement = {
            id: Date.now(),
            type,
            position: { x: 200, y: 200 },
            size: { width: 100, height: 100 },
            color: '#ff0000',
            rotation: 0,
            lineWidth: type === 'line' ? 2 : undefined,
            borderRadius: type === 'circle' ? 50 : 0,
            opacity: 1,
            borderColor: '#000000',
            borderStyle: 'solid',
            borderWidth: 0,
            boxShadow: 'none',
            fillType: 'solid',
            gradient: '',
            zIndex: 200
        };

        if (selectedSlideId) {
            addNewElement(newShapeElement);
            selectElementAction(newShapeElement.id)
        }
    };

    return {
        createTextElement,
        createImageElement,
        createShapeElement
    };
};