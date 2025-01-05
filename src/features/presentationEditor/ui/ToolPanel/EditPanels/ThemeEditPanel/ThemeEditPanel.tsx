import styles from './ThemeEditPanel.module.css'
import {useRef, useState} from "react";
import plusIcon from "@/assets/Plus.svg";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import {slideThemes} from "@/shared/constants/slideThemes.ts";

const ThemeEditPanel = () => {
    
    const {
        selectedPresentation,
        selectedPresentationId,
        updateAllSlidesBackgroundImageAction
    } = useStoreSelector();
    const [themes, setThemes] = useState(slideThemes);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleThemeSelect = (image: string) => {
        if (!selectedPresentationId) return;
        const allSlidesHaveSelectedTheme = selectedPresentation?.slides.every(slide => slide.backgroundImage === image);
        if (allSlidesHaveSelectedTheme) {
            updateAllSlidesBackgroundImageAction('');
        } else {
            updateAllSlidesBackgroundImageAction(image);
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newTheme = { id: themes.length + 1, image: reader.result as string };
                setThemes([...themes, newTheme]);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className={styles.themeEditWrapper}>
            <p className={styles.themeEditTitle}>Задний фон слайда</p>
            <div className={styles.themeEditScrollWrapper}>
                {themes.map((theme) => {
                    const isSelected = selectedPresentation?.slides.every(slide => slide.backgroundImage === theme.image);
                    return (
                        <div
                            key={theme.id}
                            className={`${styles.themeItem} ${isSelected ? styles.selectedTheme : ''}`}
                            onClick={() => handleThemeSelect(theme.image)}
                        >
                            <img src={theme.image} alt={`Тема ${theme.id}`} className={styles.themeImage} loading="lazy"/>
                        </div>
                    );
                })}
                <div className={styles.themeAddButtonWrapper}>
                    <div className={styles.themeAddButton} onClick={handleButtonClick}>
                        <img src={plusIcon} alt="+" width={30} height={30}/>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                        style={{display: 'none'}}
                        ref={fileInputRef}
                    />
                </div>
                {/*<CustomButton*/}
                {/*    style={{}}*/}
                {/*    onClick={handleButtonClick}*/}
                {/*>*/}
                {/*    Загрузить изображение*/}
                {/*</CustomButton>*/}
                {/*<input*/}
                {/*    type="file"*/}
                {/*    accept="image/*"*/}
                {/*    onChange={handleFileChange}*/}
                {/*    className={styles.fileInput}*/}
                {/*    style={{display: 'none'}}*/}
                {/*    ref={fileInputRef}*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default ThemeEditPanel;