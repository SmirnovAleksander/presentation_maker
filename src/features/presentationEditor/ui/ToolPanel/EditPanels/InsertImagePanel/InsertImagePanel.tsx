import {useRef, useState} from "react";
import styles from "./InsertImagePanel.module.css";
import {CustomButton} from "@/shared/ui";
import {ImageElement} from "@/shared/types/types.ts";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";

const InsertImagePanel = () => {
    const {
        selectedElement,
        updateSelectedElement,
        selectedPresentationId,
        selectedSlideId,
        addNewElement,
        selectElementAction
    } = useStoreSelector();

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
                addImageElement(imageUrl)
            }
        }
    };

    const addImageElement = (imageUrl: string) => {
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

        if (selectedSlideId && selectedPresentationId) {
            addNewElement(newImageElement);
            selectElementAction(newImageElement.id)
        }
    };
    return (
        <div className={styles.insertPanelWrapper}>
            <p className={styles.insertPanelTitle}>Импорт фото</p>
            <div className={styles.imageWrapper}>
                <div className={styles.itemEditWrapper}>
                    <p>Url: </p>
                    <input
                        style={{width: '300px'}}
                        type="text"
                        value={isImageElement ? selectedElement.content : defaultImageContent}
                        onChange={(e) => {
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