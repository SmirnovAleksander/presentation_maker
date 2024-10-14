import {updateElement} from "../../../../store/actions.ts";
import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import styles from './ImageEditPanel.module.css'

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
    return (
        <div className={styles.imageEditWrapper}>
            <p>Параметры картинки</p>
            {selectedElement && selectedElement.type === 'image'
                ? (
                    <div>
                        <div>
                            <label>Id: </label>
                            {selectedElement && selectedElement.id}
                        </div>
                        <div>
                            <label>URL изображения:</label>
                            <input
                                type="text"
                                value={selectedElement.content}
                                onChange={(e) => {
                                    updateContent(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label>Загрузить изображение:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        Выбери картинку
                    </div>
                )}
        </div>
    );
};

export default ImageEditPanel;