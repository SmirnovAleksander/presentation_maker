import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import ResizeHandles from "./ResizeHandles.tsx";
import type {TextElement} from "@/shared/types/types.ts";
import {AppDispatch} from "@/app/store/store.ts";
import useDragAndResize from "@/shared/hooks/useDragAndResize.tsx";
import {updateElement} from "@/app/store/actions.ts";

interface TextElementProps {
    element: TextElement
}

const TextElement: React.FC<TextElementProps> = ({element}) => {
    const dispatch: AppDispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const {
        isDragging,
        isSelected,
        localPosition,
        localSize,
        handleMouseDown,
        handleResizeMouseDown
    } = useDragAndResize(element, isEditing);

    const { content, fontSize, fontFamily, color, rotation, backgroundColor, textTransform, bold, italic, alignment, strikethrough, underline } = element;

    // Логика для редактирования текста
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [editableText, setEditableText] = useState(content);

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

    const updateElementContent = (newText: string) => {
        dispatch(updateElement(element.id, { content: newText }));
    };

    if (!element || element.type !== 'text') return null;

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
                textAlign: alignment,
                border: isSelected ? '1px solid blue' : 'none',
                cursor: isDragging ? 'move' : 'move',
                userSelect: isEditing ? 'text' : 'none',
                color: color,
                backgroundColor: backgroundColor,
                transform: `rotate(${rotation}deg)`,
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily,
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
                        fontFamily: fontFamily,
                        fontWeight: bold ? 'bold' : 'normal',
                        fontStyle: italic ? 'italic' : 'normal',
                        color: color,
                        textAlign: alignment,
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
            {isSelected && <ResizeHandles onResizeStart={handleResizeMouseDown} />}
        </div>
    );
};

export default TextElement;
