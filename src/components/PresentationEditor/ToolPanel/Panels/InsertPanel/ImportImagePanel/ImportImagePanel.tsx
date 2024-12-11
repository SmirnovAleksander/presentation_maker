import styles from './ImportImagePanel.module.css'
import {useState} from "react";
import CustomButton from "../../../../../UI/CustomButton/CustomButton.tsx";
import axios from "axios";

interface ImportImagePanelInterface {
    onClose: () => void;
}

interface UnsplashResult {
    urls: {
        small: string;
        full: string;
    };
}

const ImportImagePanel: React.FC<ImportImagePanelInterface> = ({ onClose }) => {

    const [query, setQuery] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const UNSPLASH_API_KEY = "iPGFpaXWv-4mrnUQ6PbNXcDj1pVd1vx0AeC3L24qdOY";

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        try {
            const response = await axios.get("https://api.unsplash.com/search/photos", {
                params: {
                    query: query,
                    client_id: UNSPLASH_API_KEY,
                    per_page: 20,
                }
            })
            const imageUrls = (response.data.results as UnsplashResult[]).map((result)=> result.urls.small);
            setImages(imageUrls);
        } catch (error) {
            console.error("Ошибка при поиске изображений:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSelectImage = (url: string) => {
        // Реализуйте добавление изображения в редактор
        console.log("Выбранное изображение:", url);
        onClose();
    };

    return (
        <div className={styles.imageSearchOverlay}>
            <div className={styles.imageSearchContent}>
                <div className={styles.imageSearchContainer}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter an image"
                        className={styles.searchInput}
                    />
                    <CustomButton onClick={handleSearch} disabled={loading}>
                        {loading ? "Идет поиск..." : "Искать"}
                    </CustomButton>
                </div>
                <div className={styles.imageGrid}>
                    {images.map((url) => (
                        <img
                            key={url}
                            src={url}
                            alt="Unsplash"
                            className={styles.imageItem}
                            onClick={() => handleSelectImage(url)}
                        />
                    ))}
                </div>
                <CustomButton onClick={onClose} style={{position: 'absolute'}}>Закрыть</CustomButton>
            </div>
        </div>
    );
};

export default ImportImagePanel;