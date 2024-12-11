import styles from './ImportImagePanel.module.css'
import {useState} from "react";
import CustomButton from "../../../../../UI/CustomButton/CustomButton.tsx";
import axios from "axios";
import arrowIconRight from '../../../../../../assets/arrow_icon_right.png'
import arrowIconLeft from '../../../../../../assets/arrow_icon_left.png'
import {ImageElement} from "../../../../../../store/types.ts";
import {addElement, selectElement} from "../../../../../../store/actions.ts";
import {AppDispatch, appState} from "../../../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";

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

    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const presentations = useSelector((state: appState) => state.present.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);


    const [query, setQuery] = useState<string>('');
    const [images, setImages] = useState<UnsplashResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
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
            const imageUrls = (response.data.results as UnsplashResult[]);
            setImages(imageUrls);
        } catch (error) {
            console.error("Ошибка при поиске изображений:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSelectImage = (index: number) => {
        setSelectedImageIndex(index);
    };
    const handleCloseImage = () => {
        setSelectedImageIndex(null);
    }

    const handleNextImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    }

    const handlePrevImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    }

    const handleDownloadImage = () => {
        if (selectedImageIndex !== null) {
            const imageUrl = images[selectedImageIndex].urls.full;
            window.open(imageUrl, "_blank");
        }
    };

    const handleAddToSlide = () => {
        if (selectedImageIndex !== null) {
            const imageUrl = images[selectedImageIndex].urls.full;

            const newImageElement: ImageElement = {
                id: Date.now(),
                type: 'image',
                content: imageUrl,
                position: { x: 150, y: 150 },
                size: { width: 100, height: 100 },
                rotation: 0,
                borderColor: '#000000',
                borderStyle: 'solid',
                borderWidth: 0,
                borderRadius: 0,
                boxShadow: 'none',
                opacity: 1,
            };

            if (selectedSlideId && selectedPresentation) {
                dispatch(addElement(newImageElement));
                dispatch(selectElement(newImageElement.id));
            } else {
                console.warn("Слайд или презентация не выбраны!");
            }
        }
    };


    return (
        <div className={styles.imageSearchOverlay} onClick={onClose}>
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
                    {images.map((image, index) => (
                        <img
                            key={image.urls.small}
                            src={image.urls.small}
                            alt="Unsplash"
                            className={styles.imageItem}
                            onClick={() => handleSelectImage(index)}
                        />
                    ))}
                </div>
                <CustomButton onClick={onClose} style={{position: 'absolute'}}>Закрыть</CustomButton>
            </div>
            {selectedImageIndex !== null && (
                <div className={styles.imagePreviewOverlay} onClick={handleCloseImage}>
                    <div className={styles.imagePreviewContent} onClick={(e) => e.stopPropagation()}>

                        <img
                            src={arrowIconLeft}
                            alt="&#8592;"
                            className={styles.navButtonLeft}
                            onClick={handlePrevImage}
                            // disabled={selectedImageIndex <= 0}
                        />
                        <div className={styles.imageWrapper}>
                            <img src={images[selectedImageIndex].urls.small} alt="Preview"
                                 className={styles.imagePreview}/>
                        </div>
                        <img
                            src={arrowIconRight}
                            className={styles.navButtonRight}
                            onClick={handleNextImage}
                            alt="&#8594;"
                            // disabled={selectedImageIndex >= images.length - 1}
                        />
                    </div>
                    <div className={styles.actionButtons}>
                        <CustomButton onClick={handleDownloadImage}>
                            Полноформатная картинка
                        </CustomButton>
                        <CustomButton onClick={handleAddToSlide}>
                            Добавить на слайд
                        </CustomButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImportImagePanel;