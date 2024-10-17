import React from "react";

interface CustomInputProps {
    value?: string | number;
    placeholder?: string | number;
    onChange?: () => void;
    maxLength?: number;
    style?: React.CSSProperties;
}

const CustomInput: React.FC<CustomInputProps> = ({style ,value, maxLength, placeholder, onChange}) => {
    return (
        <>
            <input
                type="number"
                style={style}
                value={value}
                maxLength={maxLength}
                placeholder={placeholder?.toString()}
                onChange={onChange}
            />
        </>
    );
};

export default CustomInput;