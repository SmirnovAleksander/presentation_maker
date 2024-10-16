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

    const isImageElement = selectedElement && selectedElement.type === 'image'

    const updateBorderColor = (color: string) => {
        if (isImageElement)
            dispatch(updateElement(selectedElement.id, { borderColor: color }));
    };
    const updateBorderStyle = (style: 'solid' | 'dashed' | 'dotted') => {
        if (isImageElement)
            dispatch(updateElement(selectedElement.id, { borderStyle: style }));
    };
    const updateBorderWidth = (width: number) => {
        if (isImageElement)
            dispatch(updateElement(selectedElement.id, { borderWidth: width }));
    };
    const updateBorderRadius = (radius: number) => {
        if (isImageElement)
            dispatch(updateElement(selectedElement.id, { borderRadius: radius }));
    };
    const updateBoxShadow = (shadow: string) => {
        if (isImageElement)
            dispatch(updateElement(selectedElement.id, { boxShadow: shadow }));
    };
    const updateOpacity = (opacity: number) => {
        if (isImageElement)
            dispatch(updateElement(selectedElement.id, { opacity }));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            updateContent(imageUrl);
        }
    };

    const defaultImageContent = 'https://avatars.dzeninfra.ru/get-zen_doc/1333513/pub_5fb9552f9d2ffe38eeb21401_5fb955f29d2ffe38eeb3305f/scale_1200';

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
                <label>Цвет границы:</label>
                <input
                    type="color"
                    value={selectedElement!.borderColor}
                    onChange={(e) => updateBorderColor(e.target.value)}
                />

                {/* Изменение стиля границы */}
                <label>Стиль границы:</label>
                <select
                    value={selectedElement!.borderStyle}
                    onChange={(e) => updateBorderStyle(e.target.value as 'solid' | 'dashed' | 'dotted')}
                >
                    <option value="solid">Сплошная</option>
                    <option value="dashed">Пунктир</option>
                    <option value="dotted">Точечная</option>
                </select>

                {/* Изменение ширины границы */}
                <label>Ширина границы (px):</label>
                <input
                    type="number"
                    value={selectedElement!.borderWidth}
                    onChange={(e) => updateBorderWidth(parseInt(e.target.value))}
                />

                {/* Изменение радиуса границы */}
                <label>Радиус закругления(px):</label>
                <input
                    type="number"
                    value={selectedElement!.borderRadius}
                    onChange={(e) => updateBorderRadius(parseInt(e.target.value))}
                />

                {/* Изменение тени */}
                <label>Тень:</label>
                <input
                    type="text"
                    value={selectedElement!.boxShadow}
                    onChange={(e) => updateBoxShadow(e.target.value)}
                />

                {/* Изменение прозрачности */}
                <label>Прозрачность:</label>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={selectedElement!.opacity}
                    onChange={(e) => updateOpacity(parseFloat(e.target.value))}
                />
            </div>}
        </>
    );
};

export default ImageEditPanel;