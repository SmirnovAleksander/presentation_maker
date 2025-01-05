import { useRef, useState } from "react";
import styles from "./InsertImagePanel.module.css";
import { CustomButton, CustomInput } from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { useCreateElements } from "@/shared/hooks/useCreateElements";

const InsertImagePanel = () => {
    const { selectedPresentationId, selectedSlideId } = useStoreSelector();
    const { createImageElement } = useCreateElements();

    const [imageUrl, setImageUrl] = useState("");
    const [showImageInput, setShowImageInput] = useState<boolean>(false);

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
            if (selectedPresentationId && selectedSlideId) {
                createImageElement(imageUrl);
            }
        }
    };

    const handleImageAdd = () => {
        if (imageUrl && selectedPresentationId && selectedSlideId) {
            createImageElement(imageUrl);
            setImageUrl("");
        }
    };

    return (
        <div className={styles.insertPanelWrapper}>
            <p className={styles.insertPanelTitle}>Импорт картинки</p>
            <div className={styles.imageWrapper}>
                {!showImageInput ? (
                    <CustomButton 
                        onClick={() => setShowImageInput(true)} 
                    >
                        Добавить картинку через URL
                    </CustomButton>
                ) : (
                    <div className={styles.imageInputGroup}>
                        <CustomInput
                            style={{width: 300}}
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder={"Введите URL картинки"}
                        />
                        <CustomButton 
                            onClick={handleImageAdd}
                            disabled={!imageUrl.trim()}
                        >
                            Добавить
                        </CustomButton>
                        <CustomButton 
                            onClick={() => {
                                setShowImageInput(false);
                                setImageUrl("");
                            }}
                        >
                            Отмена
                        </CustomButton>
                    </div>
                )}
                <div className={styles.imageDownloadWrapper}>
                    <CustomButton
                        onClick={handleButtonClick}
                        disabled={!selectedSlideId}
                    >
                        Загрузить изображение
                    </CustomButton>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                    {uploadedImage && (
                        <div className={styles.smallImageWrapper}>
                            <img
                                src={uploadedImage}
                                alt="image"
                                className={styles.smallImage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InsertImagePanel;