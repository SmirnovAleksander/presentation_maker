import {useDispatch, useSelector} from "react-redux";
import styles from './CreateElementButtons.module.css'
import {CustomButton} from "@/shared/ui";
import {AppDispatch, appState} from "@/app/store/store.ts";
import {ImageElement, ShapeElement, TextElement} from "@/app/store/types.ts";
import {addElement, selectElement} from "@/app/store/actions.ts";

const CreateElementButtons = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);

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
            backgroundColor: 'transparent',
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
            textTransform: 'none',
            alignment: 'left',
        };

        if (selectedSlideId) {
            dispatch(addElement(newTextElement));
            dispatch(selectElement(newTextElement.id))
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
            borderColor: '#000000',
            borderStyle: 'solid',
            borderWidth: 0,
            borderRadius: 0,
            boxShadow: 'none',
            opacity: 1,
        };

        if (selectedSlideId) {
            dispatch(addElement(newImageElement));
            dispatch(selectElement(newImageElement.id))
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
            lineWidth: type === 'line' ? 2 : undefined,
            borderRadius: type === 'circle' ? 50 : 0,
            opacity: 1,
            borderColor: '#000000',
            borderStyle: 'solid',
            borderWidth: 0,
            boxShadow: 'none',
            fillType: 'solid',
            gradient: ''
        };

        if (selectedSlideId) {
            dispatch(addElement(newShapeElement));
            dispatch(selectElement(newShapeElement.id))
        }
    };
    return (
        <div className={styles.elementButtonsWrapper}>
            {/*<p>Добавить</p>*/}
            <CustomButton onClick={addTextElement} disabled={!selectedSlideId}>Text</CustomButton>
            <CustomButton onClick={addImageElement} disabled={!selectedSlideId}>Image</CustomButton>
            <CustomButton onClick={() => addShapeElement('rectangle')} disabled={!selectedSlideId}>Rectangle</CustomButton>
            <CustomButton onClick={() => addShapeElement('circle')} disabled={!selectedSlideId}>Circle</CustomButton>
            <CustomButton onClick={() => addShapeElement('line')} disabled={!selectedSlideId}>Line</CustomButton>
        </div>
    );
};

export default CreateElementButtons;