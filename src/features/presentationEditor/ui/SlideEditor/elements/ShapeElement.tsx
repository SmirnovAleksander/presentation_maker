import React from 'react';
import ResizeHandles from "./ResizeHandles.tsx";
import type {ShapeElement} from "@/shared/types/types.ts";
import useDragAndResize from "@/shared/hooks/useDragAndResize.tsx";
import { useContextMenu } from '@/shared/hooks/useContextMenu.tsx';
import { ContextMenu } from '@/shared/ui';

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

    const {
        contextMenu,
        handleContextMenu,
        closeContextMenu
    } = useContextMenu();

    const { color, rotation, lineWidth, borderRadius, opacity, borderWidth, borderStyle, borderColor, zIndex} = element;

    if (!element || !['rectangle', 'circle', 'line'].includes(element.type)) return null;

    const colorStyle = color?.includes('gradient')
        ? { backgroundImage: color }
        : { backgroundColor: color || '#D9D9D9' };


    return (
        <div
            onMouseDown={handleMouseDown}
            onContextMenu={handleContextMenu}
            key={color}
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
                zIndex: zIndex,
            }}
        >
            {element.type === 'rectangle' && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: `${borderRadius}px`,
                        ...colorStyle,
                        opacity: opacity,
                    }}
                />
            )}
            {element.type === 'circle' && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        ...colorStyle,
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
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={closeContextMenu}
                    element={element}
                />
            )}
        </div>
    );
};

export default ShapeElement;
