import React, {useState, useEffect, useRef} from 'react';
import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectElement, updateElement} from "../../../../store/actions.ts";
import ResizeHandles from "./ResizeHandles.tsx";
import type {TextElement} from "../../../../store/types.ts";

interface TextElementProps {
    element: TextElement
}
const TextElement: React.FC<TextElementProps> = ({element}) => {
    const dispatch : AppDispatch = useDispatch();

    const selectedElementId = useSelector((state: appState) => state.selectedElementId);
    const isSelected = selectedElementId === element.id;

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });

    const { content, fontSize, fontFamily, color, rotation, position, size, backgroundColor, textTransform, bold, italic, alignment, strikethrough, underline } = element;

    const [localPosition, setLocalPosition] = useState(position);
    const [localSize, setLocalSize] = useState(size);
    const [myTimer, setMyTimer] = useState(0);

    //для textarea
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [editableText, setEditableText] = useState(element?.type === 'text' ? element.content : '');

    // useEffect(() => {
    //     if (element && element.type === 'text' && element.content !== editableText) {
    //         setEditableText(element.content);
    //     }
    // }, [element]);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableText(e.target.value);
        updateElementContent(e.target.value);
    };
    const handleBlur = () => {
        setIsEditing(false);
        updateElementContent(editableText);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsEditing(false);
            updateElementContent(editableText);
        }
    };
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    /////

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
            dispatch(updateElement(element.id, {position: localPosition, size: localSize }));
        } else {
            if (myTimer) {
                clearTimeout(myTimer);
            }
            const newTime = window.setTimeout(() => {
                dispatch(updateElement(element.id, {position: localPosition, size: localSize }));
            }, 5000);
            setMyTimer(newTime);
        }
        return () => {
            if (myTimer) {
                clearTimeout(myTimer);
            }
        };
    }, [localPosition, localSize, isSelected]);

    if (!element) return null;
    if (element.type !== 'text') return null;

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
    const updateElementContent = (newText: string) => {
        dispatch(updateElement(element.id, { content: newText }));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target instanceof HTMLTextAreaElement) {
            return;
        }

        if (!isEditing) {
            e.stopPropagation();
            e.preventDefault(); // Отключаем выделение
            setIsDragging(true);
            setDragStart({ x: e.clientX - localPosition.x, y: e.clientY - localPosition.y });
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
        setResizeStart({ width: size.width, height: size.height, direction });
    };



    return (
        <div
            className={`text-element ${isSelected ? 'selected' : ''}`}
            style={{
                whiteSpace: 'pre-wrap',
                top: localPosition.y,
                left: localPosition.x,
                width: localSize.width,
                height: localSize.height,
                position: 'absolute',
                textAlign: `${alignment}`,
                border: isSelected ? '1px solid blue' : 'none',
                cursor: isDragging ? 'move' : 'default',
                userSelect: isEditing ? 'text' : 'none', // Отключает выделение текста
                color: `${color}`,
                backgroundColor: `${backgroundColor}`,
                transform: `rotate(${rotation}deg)`,
                fontSize: `${fontSize}px`,
                fontFamily: `${fontFamily}`,
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: italic ? 'italic' : 'normal',
                textDecoration: `${underline ? 'underline' : ''} ${strikethrough ? 'line-through' : ''}`,
                textTransform: textTransform,
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
        >
            {isEditing ? (
                <textarea
                    ref={inputRef}
                    value={editableText}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                        width: '100%',
                        height: '100%',
                        fontSize: `${fontSize}px`,
                        fontFamily: `${fontFamily}`,
                        fontWeight: bold ? 'bold' : 'normal',
                        fontStyle: italic ? 'italic' : 'normal',
                        color: `${color}`,
                        textAlign: `${alignment}`,
                        border: 'none',
                        outline: 'none',
                        backgroundColor: backgroundColor,
                        textDecoration: `${underline ? 'underline' : ''} ${strikethrough ? 'line-through' : ''}`,
                        textTransform: textTransform,
                        transform: `rotate(${rotation}deg)`,
                        resize: 'none',
                        overflow: 'hidden',
                        background: "transparent"
                    }}
                />
            ) : (
                <p style={{margin: 0}}>{content}</p>
            )}
            {isSelected && (<ResizeHandles onResizeStart={handleResizeMouseDown} />)}
        </div>
    );
};

export default TextElement;
