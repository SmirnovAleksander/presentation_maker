import React from 'react';
import styles from './SwitchToggle.module.css';

interface SwitchToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ checked, onChange }) => {
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className={styles.slider}></span>
        </label>
    );
};

export default SwitchToggle;
