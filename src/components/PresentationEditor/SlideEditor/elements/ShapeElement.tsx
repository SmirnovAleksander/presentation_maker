import React, { useState, useEffect } from 'react';
import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectElement, updateElement} from "../../../../store/actions.ts";
import ResizeHandles from "./ResizeHandles.tsx";
import type {ShapeElement} from "../../../../store/types.ts";

interface ShapeElementProps {
    element: ShapeElement
}

const ShapeElement: React.FC<ShapeElementProps> = ({element}) => {
    const dispatch : AppDispatch = useDispatch();

    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);  // Получаем ID выделенного элемента
    const isSelected = selectedElementId === element.id;  // Проверяем, выбран ли текущий элемент

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });

    const { color, rotation, position, size, lineWidth, borderRadius, opacity, borderWidth, borderStyle, borderColor} = element;

    const [localPosition, setLocalPosition] = useState(position);
    const [localSize, setLocalSize] = useState(size);

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
        if (!isSelected) {
            dispatch(updateElement(element.id, { position: localPosition, size: localSize }));
        }
    }, [isSelected]);

    useEffect(() => {
        setLocalPosition(element.position);
        setLocalSize(element.size);
    }, [element]);

    if (!element) return null;
    if (!['rectangle', 'circle', 'line'].includes(element.type)) return null;

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
            if (resizeStart.direction.includes('right')) {
                newWidth = Math.max(50, resizeStart.width + (e.clientX - dragStart.x));
            } else if (resizeStart.direction.includes('left')) {
                newWidth = Math.max(50, resizeStart.width - (e.clientX - dragStart.x));
            }
            if (resizeStart.direction.includes('bottom')) {
                newHeight = Math.max(20, resizeStart.height + (e.clientY - dragStart.y));
            } else if (resizeStart.direction.includes('top')) {
                newHeight = Math.max(20, resizeStart.height - (e.clientY - dragStart.y));
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
        <>
            <div
                onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    top: localPosition.y,
                    left: localPosition.x,
                    width: localSize.width,
                    height: localSize.height,
                    // backgroundColor: isSelected ? 'rgba(0, 0, 255, 0.3)' : 'transparent',
                    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                    cursor: isDragging ? 'move' : 'default',
                    userSelect: 'none',
                    pointerEvents: 'auto',
                    transform: `rotate(${rotation}deg)`,
                    opacity: opacity,
                    borderRadius: '50%',
                    // boxShadow: `0px 0px 10px ${borderColor}`,
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
                            // boxShadow: `0px 0px 10px ${borderColor}`,
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
                            // boxShadow: `0px 0px 10px ${borderColor}`,
                        }}
                    />
                )}
                {element.type === 'line' && (
                    <div
                        style={{
                            position: 'absolute',
                            top: size.height / 2,
                            left: 0,
                            width: size.width,
                            height: `${lineWidth}px`,
                            backgroundColor: color,
                        }}
                    />
                )}
                {isSelected && (<ResizeHandles onResizeStart={handleResizeMouseDown}/>)}
            </div>
        </>

    );
};

export default ShapeElement;
