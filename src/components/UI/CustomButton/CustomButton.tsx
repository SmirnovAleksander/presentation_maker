import React from 'react';
import styles from './CustomButton.module.css';

interface CustomButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children, style, disabled }) => {
    return (
        <button
            className={styles.customButton}
            onClick={onClick}
            style={style}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default CustomButton;
