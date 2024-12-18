import React, { useState, useEffect } from 'react';
import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {deleteElement, selectElement, updateElement} from "../../../../store/actions.ts";
import ResizeHandles from "./ResizeHandles.tsx";
import type {ImageElement} from "../../../../store/types.ts";

interface ImageProps {
    element: ImageElement
}

const ImageElement: React.FC<ImageProps> = ({element}) => {
    const dispatch : AppDispatch = useDispatch();

    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);
    const isSelected = selectedElementId === element.id;

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });

    const { rotation, position, size, content, borderRadius, borderColor, borderStyle, borderWidth, opacity, boxShadow} = element;

    const [localPosition, setLocalPosition] = useState(position);
    const [localSize, setLocalSize] = useState(size);

    useEffect(() => {
        if (!isSelected) {
            dispatch(updateElement(element.id, { position: localPosition, size: localSize }));
        }
    }, [isSelected]);

    useEffect(() => {
        setLocalPosition(element.position);
        setLocalSize(element.size);
    }, [element]);


    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isSelected && e.key === 'Delete') {
                dispatch(deleteElement(element.id));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSelected, element.id]);


    if (!element) return null;
    if (element.type !== 'image') return null;

    const slideWidth = 1200;
    const slideHeight = 672;
    const updatePosition = (x: number, y: number) => {
        const newX = Math.max(0, Math.min(x, slideWidth - localSize.width));
        const newY = Math.max(0, Math.min(y, slideHeight - localSize.height));
        setLocalPosition({ x: newX, y: newY });
    }
    const updateSize = (width: number, height: number) => {
        const newWidth = Math.min(Math.max(50, width), slideWidth - localPosition.x);
        const newHeight = Math.min(Math.max(20, height), slideHeight - localPosition.y);
        setLocalSize({ width: newWidth, height: newHeight });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - localPosition.x, y: e.clientY - localPosition.y });
        if (selectedElementId !== element.id) {
            dispatch(selectElement(element.id))
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            updatePosition(e.clientX - dragStart.x, e.clientY - dragStart.y);
        }
        if (isResizing) {
            let newWidth = localSize.width;
            let newHeight = localSize.height;
            if (resizeStart.direction.includes('left')) {
                newWidth = Math.max(50, resizeStart.width - (e.clientX - dragStart.x));
            } else if (resizeStart.direction.includes('right')) {
                newWidth = Math.max(50, resizeStart.width + (e.clientX - dragStart.x));
            }
            if (resizeStart.direction.includes('top')) {
                newHeight = Math.max(20, resizeStart.height - (e.clientY - dragStart.y));
            } else if (resizeStart.direction.includes('bottom')) {
                newHeight = Math.max(20, resizeStart.height + (e.clientY - dragStart.y));
            }
            updateSize(newWidth, newHeight);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setResizeStart({ width: localSize.width, height: localSize.height, direction });
    };
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
            }}
            onMouseDown={handleMouseDown}
        >
            <img
                src={content}
                alt="Image"
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    borderRadius: `${borderRadius}px`,
                    // border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                    opacity: opacity,
                }}
            />
            {isSelected && <ResizeHandles onResizeStart={handleResizeMouseDown} />}
        </div>
    );
};

export default ImageElement;
