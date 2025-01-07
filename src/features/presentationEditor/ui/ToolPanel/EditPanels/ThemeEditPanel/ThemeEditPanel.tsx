import styles from './ThemeEditPanel.module.css'
import {useEffect, useState} from "react";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import axios from "axios";
import { BsPlusLg } from "react-icons/bs";
import { CustomButton } from '@/shared/ui';
import ThemesCategoryList from './ThemesCategoryList/ThemesCategoryList';

interface UnsplashResult {
    urls: {
        small: string;
        full: string;
        regular: string;
        thumb: string;
    };
}

const ThemeEditPanel = () => {
    
    const {
        selectedPresentation,
        selectedPresentationId,
        updateAllSlidesBackgroundImageAction
    } = useStoreSelector();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
    
    const handleThemeSelect = (image: string) => {
        if (!selectedPresentationId) return;
        const allSlidesHaveSelectedTheme = selectedPresentation?.slides.every(slide => slide.backgroundImage === image);
        if (allSlidesHaveSelectedTheme) {
            updateAllSlidesBackgroundImageAction('');
        } else {
            updateAllSlidesBackgroundImageAction(image);
        }
        setSelectedTheme(image);
    };
    const [imagesByCategory, setImagesByCategory] = useState<{ [key: string]: UnsplashResult[] }>({
        background: [],
        texture: [],
        abstract: [],
        landscape: []
    });

    const [loading, setLoading] = useState<boolean>(false);
    const UNSPLASH_API_KEY = "iPGFpaXWv-4mrnUQ6PbNXcDj1pVd1vx0AeC3L24qdOY";

    const fetchImages = async () => {
        const categories = ["background", "texture", "abstract", "landscape"];
        const newImagesByCategory: { [key: string]: UnsplashResult[] } = {
            background: [],
            texture: [],
            abstract: [],
            landscape: []
        };
        for (const category of categories) {
            try {
                const response = await axios.get("https://api.unsplash.com/search/photos", {
                    params: {
                        query: category,
                        client_id: UNSPLASH_API_KEY,
                        per_page: 15,
                        page: 1
                    }
                });
                newImagesByCategory[category] = response.data.results as UnsplashResult[];
            } catch (error) {
                console.error(`Ошибка при загрузке изображений для категории ${category}:`, error);
            }
        }
    
        setImagesByCategory(newImagesByCategory);
        setLoading(false);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const currentTheme = selectedPresentation?.slides[0].backgroundImage

    return (
        <div className={styles.themeEditWrapper}>
            <p className={styles.themeEditTitle}>Задний фон слайда</p>
            <div className={styles.themeEditScrollWrapper}>
                {currentTheme !== '' && (
                    <div 
                        className={`${styles.themeItem} ${currentTheme !== '' ? styles.selectedTheme : ''}`} 
                        onClick={() => handleThemeSelect(selectedTheme!)}
                    >
                        <img src={selectedTheme!} className={styles.themeImage} loading="lazy"/>
                    </div>
                )}
                {imagesByCategory.background
                    .filter(image => currentTheme !== image.urls.regular || currentTheme === null)
                    .map((image, index) => {
                    const isSelected = selectedPresentation?.slides.every(slide => slide.backgroundImage === image.urls.regular);
                    return (
                        <div 
                            key={index} 
                            className={`${styles.themeItem} ${isSelected ? styles.selectedTheme : ''}`} 
                            onClick={() => handleThemeSelect(image.urls.regular)}
                        >
                            <img src={image.urls.thumb} alt={`Тема ${index + 1}`} className={styles.themeImage} loading="lazy"/>
                        </div>
                    )
                })}
            </div>
            <CustomButton onClick={openModal}>Показать все категории для выбора фона</CustomButton>
            {isModalOpen && selectedPresentation && (
                <ThemesCategoryList onClose={closeModal} imagesByCategory={imagesByCategory} handleThemeSelect={handleThemeSelect} selectedPresentation={selectedPresentation}/>
            )}
        </div>
    );
};

export default ThemeEditPanel;