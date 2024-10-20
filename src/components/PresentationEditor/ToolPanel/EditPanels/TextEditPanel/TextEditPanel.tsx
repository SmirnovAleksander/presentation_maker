import styles from './TextEditPanel.module.css'
import CustomButton from "../../../../UI/CustomButton/CustomButton.tsx";
import useEditorStore from "../../../../../store/store.ts";

const TextEditPanel = () => {
    const {
        selectedPresentationId,
        selectedSlideId,
        selectedElementId,
        presentations,
        updateElement
    } = useEditorStore();

    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const isTextElement = selectedElement?.type === 'text'

    const updateFontSize = (fontSize: number) => {
        if (isTextElement)
        updateElement(selectedElement.id, { fontSize });
    };
    const updateFontFamily = (fontFamily: string) => {
        if (isTextElement)
        updateElement(selectedElement.id, { fontFamily });
    };
    ////////////////////////

    const toggleBold = () => {
        if (isTextElement)
        updateElement(selectedElement.id, { bold: !selectedElement.bold });
    };

    const toggleItalic = () => {
        if (isTextElement)
        updateElement(selectedElement.id, { italic: !selectedElement.italic });
    };

    const toggleUnderline = () => {
        if (isTextElement)
        updateElement(selectedElement.id, { underline: !selectedElement.underline });
    };

    const toggleStrikethrough = () => {
        if (isTextElement)
        updateElement(selectedElement.id, { strikethrough: !selectedElement.strikethrough });
    };

    const toggleUppercase = () => {
        if (isTextElement)
        updateElement(selectedElement.id, {
            textTransform: selectedElement.textTransform === 'uppercase' ? 'none' : 'uppercase'
        });

    };
    const changeAlignment = (newAlignment: 'left' | 'center' | 'right' | 'justify') => {
        if (isTextElement)
        updateElement(selectedElement.id, { alignment: newAlignment });
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
    const fontSize = isTextElement ? selectedElement.fontSize : 16;
    const fontFamily = isTextElement ? selectedElement.fontFamily : 'Arial';
    const bold = isTextElement ? selectedElement.bold : false;
    const italic = isTextElement ? selectedElement.italic : false;
    const underline = isTextElement ? selectedElement.underline : false;
    const strikethrough = isTextElement ? selectedElement.strikethrough : false;
    const textTransform = isTextElement ? selectedElement.textTransform : 'none';
    const alignment = isTextElement ? selectedElement.alignment : 'left';

    const standardFontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64];
    return (
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
                <CustomButton onClick={toggleBold} style={{backgroundColor: bold ? 'lightblue' : 'transparent',}}>B</CustomButton>
                <CustomButton onClick={toggleItalic} style={{backgroundColor: italic ? 'lightblue' : 'transparent',}}><i>I</i></CustomButton>
                <CustomButton onClick={toggleUnderline} style={{backgroundColor: underline ? 'lightblue' : 'transparent',}}><u>U</u></CustomButton>
                <CustomButton onClick={toggleStrikethrough} style={{backgroundColor: strikethrough ? 'lightblue' : 'transparent',}}><s>S</s></CustomButton>
                <CustomButton onClick={toggleUppercase} style={{backgroundColor: textTransform === 'uppercase' ? 'lightblue' : 'transparent',}}>Aa</CustomButton>
            </div>
            <div className={styles.textAlignmentButtons}>
                <CustomButton onClick={() => changeAlignment('left')} style={{backgroundColor: alignment === 'left' ? 'lightblue' : 'transparent',}}>Left</CustomButton>
                <CustomButton onClick={() => changeAlignment('center')} style={{backgroundColor: alignment === 'center' ? 'lightblue' : 'transparent',}}>Center</CustomButton>
                <CustomButton onClick={() => changeAlignment('right')} style={{backgroundColor: alignment === 'right' ? 'lightblue' : 'transparent',}}>Right</CustomButton>
                <CustomButton onClick={() => changeAlignment('justify')} style={{backgroundColor: alignment === 'justify' ? 'lightblue' : 'transparent',}}>Justify</CustomButton>
            </div>
        </div>
    );
};

export default TextEditPanel;