import styles from './TextEditPanel.module.css'
import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateElement} from "../../../../store/actions.ts";
import CustomButton from "../../../UI/CustomButton/CustomButton.tsx";

const TextEditPanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const presentations = useSelector((state: appState) => state.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const isTextElement = selectedElement?.type === 'text'

    const updateFontSize = (fontSize: number) => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { fontSize }));
    };
    const updateFontFamily = (fontFamily: string) => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { fontFamily }));
    };
    ////////////////////////

    const toggleBold = () => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { bold: !selectedElement.bold }));
    };

    const toggleItalic = () => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { italic: !selectedElement.italic }));
    };

    const toggleUnderline = () => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { underline: !selectedElement.underline }));
    };

    const toggleStrikethrough = () => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { strikethrough: !selectedElement.strikethrough }));
    };

    const toggleUppercase = () => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, {
            textTransform: selectedElement.textTransform === 'uppercase' ? 'none' : 'uppercase'
        }));

    };

    const changeColor = (newColor: string) => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { color: newColor }));
    };

    const changeBackgroundColor = (newColor: string) => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { backgroundColor: newColor }));
    };

    const changeAlignment = (newAlignment: 'left' | 'center' | 'right' | 'justify') => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { alignment: newAlignment }));
    };

    const deleteText = () => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { content: '' }));
    };


    ///////////////////////
    const availableFonts = [
        'Arial',
        'Verdana',
        'Times New Roman',
        'Georgia',
        'Courier New',
        'Comic Sans MS',
        'Tahoma',
        'Trebuchet MS',
    ];

    const defaultFontSize = 16;
    const defaultFontFamily = 'Arial';
    const standardFontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64];

    const fontSize = isTextElement ? selectedElement.fontSize : defaultFontSize;
    const fontFamily = isTextElement ? selectedElement.fontFamily : defaultFontFamily;

    return (
        <div className={styles.textEditWrapper}>
            <p className={styles.textEditTitle}>Text</p>
            <div className={styles.textEditFontSizeFamily}>
                <select
                    value={fontFamily}
                    onChange={(e) => {
                        updateFontFamily(e.target.value)
                    }}
                >
                    {availableFonts.map(font => (
                        <option key={font} value={font}>{font}</option>
                    ))}
                </select>
                <input
                    type="number"
                    style={{width: '50px'}}
                    value={fontSize}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        if (newValue === '') {
                            return;
                        }
                        updateFontSize(Number(newValue))
                    }}
                />
                <select
                    value={fontSize}
                    style={{width: '70px'}}
                    onChange={(e) => {
                        const newSize = Number(e.target.value);
                        updateFontSize(newSize);
                    }}
                >
                    {standardFontSizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>
            <div className={styles.textFormatButtons}>
                <CustomButton onClick={toggleBold}>B</CustomButton>
                <CustomButton onClick={toggleItalic}><i>I</i></CustomButton>
                <CustomButton onClick={toggleUnderline}><u>U</u></CustomButton>
                <CustomButton onClick={toggleStrikethrough}><s>S</s></CustomButton>
                <CustomButton onClick={toggleUppercase}>Aa</CustomButton>
                <input
                    type="color"
                    onChange={(e) => changeColor(e.target.value)}
                    title="Change Text Color"
                />
                <input
                    type="color"
                    onChange={(e) => changeBackgroundColor(e.target.value)}
                    title="Change Background Color"
                />
            </div>
            <div className={styles.textAlignmentButtons}>
                <CustomButton onClick={() => changeAlignment('left')}>Left</CustomButton>
                <CustomButton onClick={() => changeAlignment('center')}>Center</CustomButton>
                <CustomButton onClick={() => changeAlignment('right')}>Right</CustomButton>
                <CustomButton onClick={() => changeAlignment('justify')}>Justify</CustomButton>
            </div>
            <CustomButton onClick={deleteText}>
                Delete Text
            </CustomButton>
        </div>
    );
};

export default TextEditPanel;