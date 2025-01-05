import {useRef, useState} from "react";
import styles from "./InsertImagePanel.module.css";
import {CustomButton, CustomInput} from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import {useCreateElements} from "@/shared/hooks/useCreateElements";

const InsertImagePanel = () => {
    const {
        selectedElement,
        updateSelectedElement,
        selectedPresentationId,
        selectedSlideId,
    } = useStoreSelector();

    const {createImageElement} = useCreateElements();

    const updateContent = (text: string) => {
        updateSelectedElement({ content: text });
    };
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const isImageElement = selectedElement && selectedElement.type === 'image';
    const defaultImageContent = 'https://avatars.dzeninfra.ru/get-zen_doc/1333513/pub_5fb9552f9d2ffe38eeb21401_5fb955f29d2ffe38eeb3305f/scale_1200';
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
                createImageElement(imageUrl)
            }
        }
    };

    return (
        <div className={styles.insertPanelWrapper}>
            <p className={styles.insertPanelTitle}>Импорт фото</p>
            <div className={styles.imageWrapper}>
                <div className={styles.itemEditWrapper}>
                    <p>Url: </p>
                    <CustomInput
                        style={{width: '300px'}}
                        value={isImageElement ? selectedElement.content : defaultImageContent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateContent(e.target.value)
                            setUploadedImage(e.target.value)
                        }}/>
                </div>
                <div className={styles.imageDownloadWrapper}>
                    <CustomButton
                        style={{}}
                        onClick={handleButtonClick}
                        disabled={!selectedSlideId}
                    >
                        Загрузить изображение
                    </CustomButton>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{display: 'none'}}
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