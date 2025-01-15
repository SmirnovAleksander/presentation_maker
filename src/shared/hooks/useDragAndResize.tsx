import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ElementProps} from "@/shared/types/types.ts";
import {AppDispatch, appState} from "@/app/store/store.ts";
import {deleteElement, selectElement, updateElement} from "@/app/store/actions.ts";

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

    const [previousStates, setPreviousStates] = useState<Array<{ position: { x: number; y: number }; size: { width: number; height: number } }>>([]); // Используем useState
    
    const slideWidth = 1200;
    const slideHeight = 672;

    useEffect(() => {
        const updateElementIfChanged = () => {
            const currentState = { position: localPosition, size: localSize };

            const isAlreadyUpdated = previousStates.some(state =>
                state.position.x === currentState.position.x &&
                state.position.y === currentState.position.y &&
                state.size.width === currentState.size.width &&
                state.size.height === currentState.size.height
            );

            if (!isAlreadyUpdated) {
                dispatch(updateElement(element.id, currentState));
                setPreviousStates(prevStates => [...prevStates, currentState]); // Сохраняем текущее состояние
            }
        };

        const updateTimer = setTimeout(updateElementIfChanged, 1000);

        return () => {
            clearTimeout(updateTimer);
        };
    }, [localPosition, localSize]);

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
                if (e.shiftKey) {
                    newHeight = newWidth * (localSize.height / localSize.width);
                }
            } else if (resizeStart.direction.includes('right')) {
                newWidth = Math.max(50, resizeStart.width + (e.clientX - dragStart.x));
                if (e.shiftKey) {
                    newHeight = newWidth * (localSize.height / localSize.width);
                }
            }
            if (resizeStart.direction.includes('top')) {
                newHeight = Math.max(20, resizeStart.height - (e.clientY - dragStart.y));
                if (e.shiftKey) {
                    newWidth = newHeight * (localSize.width / localSize.height);
                }
            } else if (resizeStart.direction.includes('bottom')) {
                newHeight = Math.max(20, resizeStart.height + (e.clientY - dragStart.y));
                if (e.shiftKey) {
                    newWidth = newHeight * (localSize.width / localSize.height);
                }
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
