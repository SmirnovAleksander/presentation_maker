import { useState } from 'react';
import styles from './RotationEditPanel.module.css'
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";

const RotationEditPanel = () => {
    const {
        selectedElement,
        updateSelectedElement,
    } = useStoreSelector();

    const [currentAngle, setCurrentAngle] = useState<number>(0);
    const [hoverAngle, setHoverAngle] = useState<number | null>(null);

    const updateRotation = (rotation: number) => {
        if (selectedElement) {
            updateSelectedElement({ rotation });
            setCurrentAngle(rotation);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(y, x) * (180 / Math.PI) + 180;
        setHoverAngle(Math.round(angle));
    };

    const handleClick = (e: React.MouseEvent) => {
        handleMouseMove(e);
        if (hoverAngle !== null) {
            updateRotation(hoverAngle);
        }
    };

    return (
        <div className={styles.rotationEditWrapper}>
            <div
                className={styles.rotationDial}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
            >
                {Array.from({ length: 360 }, (_, index) => (
                    index % 30 === 0 && (
                        <div
                            key={index}
                            className={styles.degreeMark}
                            style={{ transform: `rotate(${index}deg)` }}
                        >
                            <span className={styles.degreeText}>{index}</span>
                        </div>
                    )
                ))}
                {hoverAngle !== null && (
                    <div className={styles.hoverAngleMark} style={{ transform: `rotate(${hoverAngle - 90}deg)` }}>
                        <span className={styles.hoverAngleText}>{hoverAngle}°</span>
                    </div>
                )}
                <div className={styles.currentAngleMark} style={{ transform: `rotate(${currentAngle - 90}deg)` }} />
            </div>
            <div className={styles.currentAngleDisplay}>
                <p>Текущий угол</p>
                <div>{currentAngle}°</div>
            </div>
        </div>
    );
};

export default RotationEditPanel;
