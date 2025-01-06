import { useState, useEffect } from 'react';

interface ContextMenuPosition {
    x: number;
    y: number;
}

export const useContextMenu = () => {
    const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(null);
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        
        // Получаем элемент, на который нажали
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();

        // Вычисляем координаты для контекстного меню
        const x = e.clientX - rect.left; // Позиция относительно элемента
        const y = e.clientY - rect.top;   // Позиция относительно элемента

        setContextMenu({ x, y });
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    useEffect(() => {
        // Добавляем обработчик события клика
        document.addEventListener('click', closeContextMenu);
        return () => {
            // Удаляем обработчик при размонтировании компонента
            document.removeEventListener('click', closeContextMenu);
        };
    }, [contextMenu]);

    return {
        contextMenu,
        handleContextMenu,
        closeContextMenu,
    };
};