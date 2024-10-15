import {updateElement} from "../../../../store/actions.ts";
import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import styles from './ImageEditPanel.module.css'
import {useRef} from "react";
import CustomButton from "../../../UI/CustomButton/CustomButton.tsx";

const ImageEditPanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const presentations = useSelector((state: appState) => state.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);
    const updateContent = (text: string) => {
        dispatch(updateElement(selectedElement!.id, { content: text }));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            updateContent(imageUrl);
        }
    };

    const defaultImageContent = 'https://avatars.dzeninfra.ru/get-zen_doc/1333513/pub_5fb9552f9d2ffe38eeb21401_5fb955f29d2ffe38eeb3305f/scale_1200';
    const isImageElement = selectedElement && selectedElement.type === 'image'

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <>
            {isImageElement && <div className={styles.imageEditWrapper}>
                <p className={styles.imageEditTitle}>Параметры картинки</p>
                <div className={styles.imageDownloadWrapper}>
                    <div>
                        <label>URL изображения:</label>
                        <input
                            type="text"
                            value={isImageElement ? selectedElement.content : defaultImageContent}
                            onChange={(e) => updateContent(e.target.value)}
                        />
                    </div>
                    <div>
                        <CustomButton
                            // className={styles.uploadButton}
                            style={{}}
                            onClick={handleButtonClick}
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
                    </div>
                </div>
            </div>}
        </>
    );
};

export default ImageEditPanel;