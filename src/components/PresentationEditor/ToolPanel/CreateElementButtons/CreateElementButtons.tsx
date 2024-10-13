import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {ImageElement, ShapeElement, TextElement} from "../../../../store/types.ts";
import {addElement} from "../../../../store/actions.ts";
import styles from './CreateElementButtons.module.css'
import CustomButton from "../../../UI/CustomButton/CustomButton.tsx";

const CreateElementButtons = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedPresentation  = useSelector((state: appState) =>
        state.presentations.find(p => p.id === selectedPresentationId)
    );

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
        <>
            {selectedSlideId && (
                <div className={styles.elementButtonsWrapper}>
                    <h3>Добавить элемент</h3>
                    <CustomButton onClick={addTextElement}>Text</CustomButton>
                    <CustomButton onClick={addImageElement}>Image</CustomButton>
                    <CustomButton onClick={() => addShapeElement('rectangle')}>Rectangle</CustomButton>
                    <CustomButton onClick={() => addShapeElement('circle')}>Circle</CustomButton>
                    <CustomButton onClick={() => addShapeElement('line')}>Line</CustomButton>
                </div>
            )}
        </>
    );
};

export default CreateElementButtons;