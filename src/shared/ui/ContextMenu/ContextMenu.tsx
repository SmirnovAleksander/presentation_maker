import React from 'react';
import styles from './ContextMenu.module.css';
import { ElementProps } from '@/shared/types/types';
import useStoreSelector from '@/shared/hooks/useStoreSelector';

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    element: ElementProps
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, element}) => {

    const {
        deleteElementAction,
        moveElementToFrontAction,
        moveElementToBackAction
    } = useStoreSelector();

    
    const handleDelete = () => {
        deleteElementAction(element.id)
        onClose();
    };

    const handleProperties = () => {
        console.log(element);
        onClose();
    };

    const handleToFront = () => {
        moveElementToFrontAction(element.id);
        onClose();
    };

    const handleToBack = () => {
        moveElementToBackAction(element.id);
        onClose();
    };
    
    return (
        <div
            className={styles.contextMenu}
            style={{ top: y, left: x }}
            onClick={onClose}
        >
            <div className={styles.menuItem} onClick={handleDelete}>
                Удалить
            </div>
            <div className={styles.menuItem} onClick={handleProperties}>
                Свойства
            </div>
            <div className={styles.menuItem} onClick={handleToFront}>
                To front
            </div>
            <div className={styles.menuItem} onClick={handleToBack}>
                To back
            </div>
        </div>
    );
};

export default ContextMenu; 