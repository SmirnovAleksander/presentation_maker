import React, { useEffect, useRef, useState } from 'react';
import styles from './ThemesCategoryList.module.css';
import { CustomButton } from '@/shared/ui';
import { Presentation } from '@/shared/types/types';
import { BsPlusLg } from 'react-icons/bs';

export interface UnsplashResult {
    urls: {
        thumb: string;
        regular: string;
    };
}

export interface ImagesByCategory {
    [key: string]: UnsplashResult[];
} 

interface ThemesCategoryListProps {
    imagesByCategory: ImagesByCategory;
    onClose: () => void;
    handleThemeSelect: (url: string) => void;
    selectedPresentation: Presentation;
}

const ThemesCategoryList: React.FC<ThemesCategoryListProps> = ({ imagesByCategory, handleThemeSelect, onClose, selectedPresentation}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploadedImages, setUploadedImages] = useState<{ id: number; image: string }[]>([]);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newTheme = { id: uploadedImages.length + 1, image: reader.result as string };
                setUploadedImages([...uploadedImages, newTheme]);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className={styles.themeEditPanelOverlay}>
            <div className={styles.themeEditPanelWrapper}>
                <div >
                    <CustomButton onClick={onClose}>Закрыть</CustomButton>
                    {Object.entries(imagesByCategory).map(([category, images]) => (
                        <div>
                            <h3>{category}</h3>
                            <div key={category} className={styles.themeEditScrollWrapper}>
                                {images.map((image, index) => {
                                    const isSelected = selectedPresentation?.slides.every(slide => slide.backgroundImage === image.urls.regular);
                                    return (
                                        <div key={index} className={`${styles.themeItem} ${isSelected ? styles.selectedTheme : ''}`}  onClick={() => handleThemeSelect(image.urls.regular)}>
                                            <img src={image.urls.thumb} alt={`Тема ${index + 1}`} className={styles.themeImage} loading="lazy" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                    <h3>Загрузить из файлов</h3>
                    <div className={styles.themeEditScrollWrapper}>
                        <div className={styles.themeEditScrollWrapper}>
                            {uploadedImages.map((uploadedImage, index) => {
                                const isSelected = selectedPresentation?.slides.every(slide => slide.backgroundImage === uploadedImage.image);
                                return (
                                    <div key={index} className={`${styles.themeItem} ${isSelected ? styles.selectedTheme : ''}`} style={{position: 'relative'}} onClick={() => handleThemeSelect(uploadedImage.image)}>
                                        <img src={uploadedImage.image} alt={`Image ${index + 1}`} className={styles.themeImage} loading="lazy" />
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.themeAddButtonWrapper}>
                            <div className={styles.addButton} onClick={handleButtonClick}>
                                <BsPlusLg size={30}/>
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
                        {uploadedImages.length === 0 && (
                            <div className={styles.placeholderTextForUpload}>
                                Загрузить изображение
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemesCategoryList;