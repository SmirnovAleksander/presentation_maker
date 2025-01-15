import React, {useState, useEffect, useRef, memo} from 'react';
import {useDispatch} from "react-redux";
import ResizeHandles from "./ResizeHandles.tsx";
import type {TextElement} from "@/shared/types/types.ts";
import {AppDispatch} from "@/app/store/store.ts";
import useDragAndResize from "@/shared/hooks/useDragAndResize.tsx";
import {updateElement} from "@/app/store/actions.ts";
import { useContextMenu } from '@/shared/hooks/useContextMenu.tsx';
import { ContextMenu } from '@/shared/ui';

interface TextElementProps {
    element: TextElement
}

const TextElement: React.FC<TextElementProps> = memo(({element}) => {
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

    const {
        contextMenu,
        handleContextMenu,
        closeContextMenu
    } = useContextMenu();

    const { content, fontSize, fontFamily, color, rotation, backgroundColor, textTransform, bold, italic, alignment, strikethrough, underline, zIndex} = element;

    // Логика для редактирования текста
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [editableText, setEditableText] = useState(content);
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableText(e.target.value);
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }
        updateTimeoutRef.current = setTimeout(() => {
            updateElementContent(e.target.value);
        }, 3000);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }
        updateElementContent(editableText);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
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

    useEffect(() => {
        return () => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }
        };
    }, []);

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
                zIndex: zIndex,
                lineHeight: '1.5'
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
            onContextMenu={handleContextMenu}
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
                        background: "transparent",
                        lineHeight: '1.5'
                    }}
                />
            ) : (
                <p style={{margin: 0}}>{content}</p>
            )}
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
    return (
        prevProps.element.id === nextProps.element.id &&
        prevProps.element.content === nextProps.element.content &&
        prevProps.element.position.x === nextProps.element.position.x &&
        prevProps.element.position.y === nextProps.element.position.y &&
        prevProps.element.size.width === nextProps.element.size.width &&
        prevProps.element.size.height === nextProps.element.size.height &&
        prevProps.element.rotation === nextProps.element.rotation &&
        prevProps.element.fontSize === nextProps.element.fontSize &&
        prevProps.element.fontFamily === nextProps.element.fontFamily &&
        prevProps.element.color === nextProps.element.color &&
        prevProps.element.backgroundColor === nextProps.element.backgroundColor &&
        prevProps.element.textTransform === nextProps.element.textTransform &&
        prevProps.element.bold === nextProps.element.bold &&
        prevProps.element.italic === nextProps.element.italic &&
        prevProps.element.alignment === nextProps.element.alignment &&
        prevProps.element.strikethrough === nextProps.element.strikethrough &&
        prevProps.element.underline === nextProps.element.underline &&
        prevProps.element.zIndex === nextProps.element.zIndex
    );
});

export default TextElement;
