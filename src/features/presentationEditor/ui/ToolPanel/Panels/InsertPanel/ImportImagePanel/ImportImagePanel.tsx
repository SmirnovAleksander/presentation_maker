import styles from './ImportImagePanel.module.css'
import {useState} from "react";
import axios from "axios";
import arrowIconRight from '../../../../../../../assets/arrow_icon_right.png'
import arrowIconLeft from '../../../../../../../assets/arrow_icon_left.png'
import {ImageElement} from "../../../../../../../shared/types/types.ts";
import {addElement, selectElement} from "../../../../../../../app/store/actions.ts";
import {AppDispatch, appState} from "../../../../../../../app/store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {CustomButton} from "@/shared/ui";

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
    const [page, setPage] = useState<number>(1);

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const UNSPLASH_API_KEY = "iPGFpaXWv-4mrnUQ6PbNXcDj1pVd1vx0AeC3L24qdOY";

    const fetchImages = async (pageNumber: number) => {
        if (!query) return;

        setLoading(true);
        try {
            const response = await axios.get("https://api.unsplash.com/search/photos", {
                params: {
                    query: query,
                    client_id: UNSPLASH_API_KEY,
                    per_page: 20,
                    page: pageNumber
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

    const handleSearch = () => {
        setPage(1);
        fetchImages(1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        setLoading(false);
        fetchImages(nextPage);
    }

    const handlePrevPage = () => {
        if (page > 1) {
            const prevPage = page - 1;
            setPage(prevPage);
            fetchImages(prevPage);
        }
    };

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
        <div className={styles.imageSearchOverlay}>
            <div className={styles.imageSearchContent}>
                <div className={styles.imageSearchContainer}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter an image"
                        className={styles.searchInput}
                        onKeyDown={handleKeyDown}
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
                {images.length > 0 && (
                    <div className={styles.paginationButtons}>
                        <CustomButton onClick={handlePrevPage} disabled={page <= 1}>
                            ⇦ Назад
                        </CustomButton>
                        <CustomButton onClick={handleNextPage}>
                            Вперед ⇨
                        </CustomButton>
                    </div>
                )}
                <CustomButton onClick={onClose} style={{position: 'absolute'}}>Закрыть</CustomButton>
                {images.length == 0 && (
                    <div style={{paddingTop: '20px'}}>
                        <h4>Введите ключевое слово для поиска изображений</h4>
                    </div>
                )}
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