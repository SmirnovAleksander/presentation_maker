import styles from './ToolPanel.module.css'
import {ImageElement, ShapeElement, Slide, TextElement} from "../../../store/types.ts";
import {addElement, addSlide, selectSlide} from "../../../store/actions.ts";
import {AppDispatch, appState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ToolPanel = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedPresentation  = useSelector((state: appState) =>
        state.presentations.find(p => p.id === selectedPresentationId)
    );
    const addNewSlide = () => {
        const newSlide: Slide = {
            id: Date.now(),
            elements: [],
            backgroundColor: '#ffffff',
        };
        if (selectedPresentation) {
            dispatch(addSlide(selectedPresentation.id, newSlide));
            dispatch(selectSlide(selectedPresentation.id, newSlide.id))
        }
    };
    const addTextElement = () => {
        const newTextElement: TextElement = {
            id: Date.now(),
            type: 'text',
            content: 'Новый текст',
            fontSize: 16,
            fontFamily: 'Arial',
            color: '#d21',
            position: { x: 100, y: 100 },
            size: { width: 200, height: 50 },
            rotation: 0,
        };

        if (selectedSlideId && selectedPresentation) {
            dispatch(addElement(selectedPresentation.id, selectedSlideId, newTextElement));
        }
    };
    const addImageElement = () => {
        const imageUrl = 'https://avatars.dzeninfra.ru/get-zen_doc/1333513/pub_5fb9552f9d2ffe38eeb21401_5fb955f29d2ffe38eeb3305f/scale_1200';
        const newImageElement: ImageElement = {
            id: Date.now(),
            type: 'image',
            content: imageUrl,
            position: { x: 150, y: 150 },
            size: { width: 100, height: 100 },
            rotation: 0,
        };

        if (selectedSlideId && selectedPresentation) {
            dispatch(addElement(selectedPresentation.id, selectedSlideId, newImageElement));
        }
    };
    const addShapeElement = (type: 'rectangle' | 'circle' | 'line') => {
        const newShapeElement: ShapeElement = {
            id: Date.now(),
            type,
            position: { x: 200, y: 200 },
            size: { width: 100, height: 100 },
            color: '#ff0000',
            rotation: 0,
            lineWidth: 2,
            borderRadius: type === 'circle' ? 50 : 0, // Пример для круга
        };

        if (selectedSlideId && selectedPresentation) {
            dispatch(addElement(selectedPresentation.id, selectedSlideId, newShapeElement));
        }
    };

    return (
        <div className={styles.toolPanelWrapper}>
            <div className={styles.panelOne}>
                <button className={styles.PanelOneButton} onClick={() => navigate('/')}>Вернуться на главную</button>
                <button className={styles.PanelOneButton} onClick={addNewSlide}>Добавить слайд</button>
            </div>
            {selectedSlideId && (
                <div className="element-buttons">
                    <h3>Добавить элемент</h3>
                    <button onClick={addTextElement}>Добавить текст</button>
                    <button onClick={addImageElement}>Добавить изображение</button>
                    <button onClick={() => addShapeElement('rectangle')}>Добавить прямоугольник</button>
                    <button onClick={() => addShapeElement('circle')}>Добавить круг</button>
                    <button onClick={() => addShapeElement('line')}>Добавить линию</button>
                </div>
            )}
        </div>
    );
};

export default ToolPanel;