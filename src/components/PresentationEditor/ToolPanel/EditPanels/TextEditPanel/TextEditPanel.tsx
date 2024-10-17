import styles from './TextEditPanel.module.css'
import {AppDispatch, appState} from "../../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateElement} from "../../../../../store/actions.ts";
import CustomButton from "../../../../UI/CustomButton/CustomButton.tsx";

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
    const changeAlignment = (newAlignment: 'left' | 'center' | 'right' | 'justify') => {
        if (isTextElement)
        dispatch(updateElement(selectedElement.id, { alignment: newAlignment }));
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
        <>
            {isTextElement && (
                <div className={styles.textEditWrapper}>
                    <p>Text</p>
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
                        <div style={{paddingLeft: '2px', display: 'flex', flexDirection: 'row'}}>
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
                    </div>
                    <div className={styles.textFormatButtons}>
                        <CustomButton onClick={toggleBold} style={{backgroundColor: selectedElement.bold ? 'lightblue' : 'transparent',}}>B</CustomButton>
                        <CustomButton onClick={toggleItalic} style={{backgroundColor: selectedElement.italic ? 'lightblue' : 'transparent',}}><i>I</i></CustomButton>
                        <CustomButton onClick={toggleUnderline} style={{backgroundColor: selectedElement.underline ? 'lightblue' : 'transparent',}}><u>U</u></CustomButton>
                        <CustomButton onClick={toggleStrikethrough} style={{backgroundColor: selectedElement.strikethrough ? 'lightblue' : 'transparent',}}><s>S</s></CustomButton>
                        <CustomButton onClick={toggleUppercase} style={{backgroundColor: selectedElement.textTransform === 'uppercase' ? 'lightblue' : 'transparent',}}>Aa</CustomButton>
                    </div>
                    <div className={styles.textAlignmentButtons}>
                        <CustomButton onClick={() => changeAlignment('left')} style={{backgroundColor: selectedElement.alignment === 'left' ? 'lightblue' : 'transparent',}}>Left</CustomButton>
                        <CustomButton onClick={() => changeAlignment('center')} style={{backgroundColor: selectedElement.alignment === 'center' ? 'lightblue' : 'transparent',}}>Center</CustomButton>
                        <CustomButton onClick={() => changeAlignment('right')} style={{backgroundColor: selectedElement.alignment === 'right' ? 'lightblue' : 'transparent',}}>Right</CustomButton>
                        <CustomButton onClick={() => changeAlignment('justify')} style={{backgroundColor: selectedElement.alignment === 'justify' ? 'lightblue' : 'transparent',}}>Justify</CustomButton>
                    </div>
                </div>
            )}
        </>

    );
};

export default TextEditPanel;