import React, { memo } from 'react';
import ResizeHandles from "./ResizeHandles.tsx";
import type { ImageElement } from "@/shared/types/types.ts";
import useDragAndResize from "@/shared/hooks/useDragAndResize.tsx";
import { ContextMenu } from '@/shared/ui';
import { useContextMenu } from '@/shared/hooks/useContextMenu.tsx';

interface ImageProps {
    element: ImageElement;
}

const ImageElement: React.FC<ImageProps> = memo(({ element }) => {
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

    const { rotation, content, borderRadius, borderColor, borderStyle, borderWidth, opacity, boxShadow, zIndex } = element;

    if (!element || element.type !== 'image') return null;

    return (
        <div
            className={`image-element ${isSelected ? 'selected' : ''}`}
            style={{
                top: localPosition.y,
                left: localPosition.x,
                width: localSize.width,
                height: localSize.height,
                position: 'absolute',
                border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                borderRadius: `${borderRadius}px`,
                boxShadow: boxShadow,
                cursor: isDragging ? 'move' : 'move',
                transform: `rotate(${rotation}deg)`,
                userSelect: 'none',
                zIndex: zIndex
            }}
            onMouseDown={handleMouseDown}
            onContextMenu={handleContextMenu}
        >
            <img
                src={content}
                alt="Image"
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    borderRadius: `${borderRadius}px`,
                    opacity: opacity,
                }}
            />
            {isSelected && <ResizeHandles onResizeStart={handleResizeMouseDown} />}
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
}, (prevProps, nextProps) => {
    // Сравниваем только те свойства, которые влияют на рендер
    return (
        prevProps.element.id === nextProps.element.id &&
        prevProps.element.content === nextProps.element.content &&
        prevProps.element.position.x === nextProps.element.position.x &&
        prevProps.element.position.y === nextProps.element.position.y &&
        prevProps.element.size.width === nextProps.element.size.width &&
        prevProps.element.size.height === nextProps.element.size.height &&
        prevProps.element.rotation === nextProps.element.rotation &&
        prevProps.element.borderRadius === nextProps.element.borderRadius &&
        prevProps.element.borderColor === nextProps.element.borderColor &&
        prevProps.element.borderStyle === nextProps.element.borderStyle &&
        prevProps.element.borderWidth === nextProps.element.borderWidth &&
        prevProps.element.opacity === nextProps.element.opacity &&
        prevProps.element.boxShadow === nextProps.element.boxShadow &&
        prevProps.element.zIndex === nextProps.element.zIndex
    );
});

export default ImageElement;
