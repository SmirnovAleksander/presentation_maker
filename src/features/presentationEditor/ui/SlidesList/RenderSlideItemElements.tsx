import {ElementProps, Slide} from "@/app/store/types.ts";
import React from "react";

interface RenderSlideItemElementsProps {
    slide: Slide;
    multiplier: number;
}

const RenderSlideItemElements: React.FC<RenderSlideItemElementsProps> = ({slide, multiplier}) => {
    const renderElement = (element: ElementProps) => {
        switch (element.type) {
            case 'text':
                return (
                    <div
                        key={element.id}
                        style={{
                            position: 'absolute',
                            whiteSpace: 'pre-wrap',
                            left: element.position.x / multiplier,
                            top: element.position.y / multiplier,
                            width: element.size.width / multiplier,
                            height: element.size.height / multiplier,
                            textAlign: `${element.alignment}`,
                            backgroundColor: `${element.backgroundColor}`,
                            fontSize: `${element.fontSize / multiplier}px`,
                            fontFamily: `${element.fontFamily}`,
                            fontWeight: element.bold ? 'bold' : 'normal',
                            fontStyle: element.italic ? 'italic' : 'normal',
                            textDecoration: `${element.underline ? 'underline' : ''} ${element.strikethrough ? 'line-through' : ''}`,
                            transform: `rotate(${element.rotation}deg)`,
                            color: element.color,
                        }}
                    >
                        {element.content}
                    </div>
                );
            case 'image':
                return (
                    <div
                        key={element.id}
                        style={{
                            left: element.position.x / multiplier,
                            top: element.position.y / multiplier,
                            width: element.size.width / multiplier,
                            height: element.size.height / multiplier,
                            position: 'absolute',
                            border: `${(element.borderWidth ?? 0) / multiplier}px ${element.borderStyle} ${element.borderColor}`,
                            borderRadius: `${(element.borderRadius ?? 0) / multiplier}px`,
                            boxShadow: element.boxShadow,
                            transform: `rotate(${element.rotation}deg)`,
                        }}
                    >
                        <img
                            src={element.content}
                            alt="Image"
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                borderRadius: `${(element.borderRadius ?? 0) / multiplier}px`,
                                opacity: element.opacity,
                            }}
                        />
                    </div>
                );
            case 'rectangle':
            case 'circle':
            case 'line':
                return (
                    <div
                        key={element.id}
                        style={{
                            position: 'absolute',
                            left: element.position.x / multiplier,
                            top: element.position.y / multiplier,
                            width: element.size.width / multiplier,
                            height: element.size.height / multiplier,
                            border: `${element.borderWidth / multiplier}px ${element.borderStyle} ${element.borderColor}`,
                            userSelect: 'none',
                            pointerEvents: 'auto',
                            transform: `rotate(${element.rotation}deg)`,
                            opacity: element.opacity,
                            borderRadius: '50%',
                        }}
                    >
                        {element.type === 'rectangle' && (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: element.color,
                                    borderRadius: `${(element.borderRadius ?? 0) / multiplier}px`,
                                    opacity: element.opacity,
                                }}
                            />
                        )}
                        {element.type === 'circle' && (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: element.color,
                                    borderRadius: '50%',
                                    opacity: element.opacity,
                                }}
                            />
                        )}
                        {element.type === 'line' && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: element.size.height / multiplier,
                                    left: 0,
                                    width: element.size.width / multiplier,
                                    height: `${(element.lineWidth ?? 0) / multiplier}px`,
                                    backgroundColor: element.color,
                                }}
                            />
                        )}
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <>
            {slide.elements.map(element => renderElement(element))}
        </>
    );
};

export default RenderSlideItemElements;