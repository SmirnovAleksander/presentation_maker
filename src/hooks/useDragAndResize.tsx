import React, {useState, useEffect} from 'react';
import {selectElement, updateElement, deleteElement} from "../store/actions.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../store/store.ts";
import {ElementProps} from "../store/types.ts";

const useDragAndResize = (element: ElementProps, isEditing?: boolean) => {
    const dispatch: AppDispatch = useDispatch();
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);
    const isSelected = selectedElementId === element.id;

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });
    
    const [localPosition, setLocalPosition] = useState(element.position);
    const [localSize, setLocalSize] = useState(element.size);

    const slideWidth = 1200;
    const slideHeight = 672;

    useEffect(() => {
        if (!isSelected) {
            dispatch(updateElement(element.id, { position: localPosition, size: localSize }));
        }
    }, [isSelected]);

    useEffect(() => {
        if (!isEditing) {
            setLocalPosition(element.position);
            setLocalSize(element.size);
        }
    }, [element, isEditing]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isSelected && e.key === 'Delete') {
                dispatch(deleteElement(element.id));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSelected, element.id]);

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

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target instanceof HTMLTextAreaElement) return;
        
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - localPosition.x, y: e.clientY - localPosition.y });
        if (selectedElementId !== element.id) {
            dispatch(selectElement(element.id));
        }
    };

    return {
        isDragging,
        isResizing,
        isSelected,
        localPosition,
        localSize,
        handleMouseDown,
        handleResizeMouseDown,
        handleMouseUp,
    };
};

export default useDragAndResize;
