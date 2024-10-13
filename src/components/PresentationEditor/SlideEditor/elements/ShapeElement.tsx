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

    const selectedElementId = useSelector((state: appState) => state.selectedElementId);  // Получаем ID выделенного элемента
    const isSelected = selectedElementId === element.id;  // Проверяем, выбран ли текущий элемент

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });


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

    if (!element) return null;
    if (!['rectangle', 'circle', 'line'].includes(element.type)) return null;
    const { color, rotation, position, size, lineWidth, borderRadius} = element;

    const slideWidth = 1200;
    const slideHeight = 675;
    const updatePosition = (x: number, y: number) => {
        const newX = Math.max(0, Math.min(x, slideWidth - element.size.width));
        const newY = Math.max(0, Math.min(y, slideHeight - element.size.height));
        dispatch(updateElement(element.id, { position: { x: newX, y: newY }}));
    }
    const updateSize = (width: number, height: number) => {
        const newWidth = Math.min(Math.max(50, width), slideWidth - element.position.x);
        const newHeight = Math.min(Math.max(20, height), slideHeight - element.position.y);
        dispatch(updateElement(element.id, { size: { width: newWidth, height: newHeight } }));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault(); // Отключаем выделение
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        dispatch(selectElement(element.id))
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            updatePosition(e.clientX - dragStart.x, e.clientY - dragStart.y);
        }
        if (isResizing) {
            let newWidth = size.width;
            let newHeight = size.height;

            // Изменяем размеры в зависимости от направления
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
        e.preventDefault(); // Отключаем выделение
        setIsResizing(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setResizeStart({ width: size.width, height: size.height, direction });
    };

    return (
        <>
            <div
                onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    width: size.width,
                    height: size.height,
                    backgroundColor: isSelected ? 'rgba(0, 0, 255, 0.3)' : 'transparent',
                    border: isSelected ? `2px solid blue` : 'none',
                    cursor: isDragging ? 'move' : 'default',
                    userSelect: 'none',
                    pointerEvents: 'auto',
                    transform: `rotate(${rotation}deg)`,
                }}
            >
                {element.type === 'rectangle' && (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: color,
                            borderRadius: `${borderRadius}px`
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
