import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";
import styles from "./InsertImagePanel.module.css";
import {CustomButton} from "@/shared/ui";
import {AppDispatch, appState} from "@/app/store/store.ts";
import {addElement, selectElement, updateElement} from "@/app/store/actions.ts";
import {ImageElement} from "@/app/store/types.ts";

const InsertImagePanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);

    const presentations = useSelector((state: appState) => state.present.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);
    const updateContent = (text: string) => {
        dispatch(updateElement(selectedElement!.id, { content: text }));
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

        if (selectedSlideId && selectedPresentation) {
            dispatch(addElement(newImageElement));
            dispatch(selectElement(newImageElement.id))
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