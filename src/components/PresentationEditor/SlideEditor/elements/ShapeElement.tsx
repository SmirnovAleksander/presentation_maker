import React from 'react';
import ResizeHandles from "./ResizeHandles.tsx";
import type {ShapeElement} from "../../../../store/types.ts";
import useDragAndResize from "../../../../hooks/useDragAndResize.tsx";

interface ShapeElementProps {
    element: ShapeElement
}

const ShapeElement: React.FC<ShapeElementProps> = ({element}) => {
    const {
        isDragging,
        isSelected,
        localPosition,
        localSize,
        handleMouseDown,
        handleResizeMouseDown
    } = useDragAndResize(element);

    const { color, rotation, lineWidth, borderRadius, opacity, borderWidth, borderStyle, borderColor} = element;

    if (!element || !['rectangle', 'circle', 'line'].includes(element.type)) return null;

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                position: 'absolute',
                top: localPosition.y,
                left: localPosition.x,
                width: localSize.width,
                height: localSize.height,
                border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                cursor: isDragging ? 'move' : 'default',
                userSelect: 'none',
                pointerEvents: 'auto',
                transform: `rotate(${rotation}deg)`,
                opacity: opacity,
                borderRadius: '50%',
            }}
        >
            {element.type === 'rectangle' && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: color,
                        borderRadius: `${borderRadius}px`,
                        opacity: opacity,
                    }}
                />
            )}
            {element.type === 'circle' && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: color,
                        borderRadius: '50%',
                        opacity: opacity,
                    }}
                />
            )}
            {element.type === 'line' && (
                <div
                    style={{
                        position: 'absolute',
                        top: localSize.height / 2,
                        left: 0,
                        width: localSize.width,
                        height: `${lineWidth}px`,
                        backgroundColor: color,
                    }}
                />
            )}
            {isSelected && (<ResizeHandles onResizeStart={handleResizeMouseDown}/>)}
        </div>
    );
};

export default ShapeElement;
