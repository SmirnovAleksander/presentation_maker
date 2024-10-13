import React from 'react';
import styles from './CustomButton.module.css';

interface CustomButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children, style }) => {
    return (
        <button className={styles.customButton} onClick={onClick} style={style}>
            {children}
        </button>
    );
};

export default CustomButton;
