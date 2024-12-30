import React from 'react';

interface CustomInputProps {
    placeholder?: string | number;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
    maxLength?: number;
    mainColor?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, value, onChange, style, maxLength, onBlur, onKeyDown}) => {
    return (
        <input
            type="text"
            placeholder={placeholder?.toString()}
            value={value}
            onChange={onChange}
            style={style}
            maxLength={maxLength}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        />
    );
};

export default CustomInput; 