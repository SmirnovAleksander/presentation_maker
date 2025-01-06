import styles from './TextEditPanel.module.css'
import {CustomButton} from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";
import { 
    MdFormatBold, 
    MdFormatItalic, 
    MdFormatUnderlined, 
    MdStrikethroughS, 
    MdFormatSize,
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
    MdFormatAlignJustify
} from "react-icons/md";

const TextEditPanel = () => {
    const {
        selectedElement,
        updateSelectedElement,
    } = useStoreSelector();

    const isTextElement = selectedElement?.type === 'text'

    const updateFontSize = (fontSize: number) => {
        if (isTextElement)
        updateSelectedElement( { fontSize });
    };
    const updateFontFamily = (fontFamily: string) => {
        if (isTextElement)
        updateSelectedElement( { fontFamily });
    };
    ////////////////////////

    const toggleBold = () => {
        if (isTextElement)
        updateSelectedElement( { bold: !selectedElement.bold });
    };

    const toggleItalic = () => {
        if (isTextElement)
        updateSelectedElement( { italic: !selectedElement.italic });
    };

    const toggleUnderline = () => {
        if (isTextElement)
        updateSelectedElement( { underline: !selectedElement.underline });
    };

    const toggleStrikethrough = () => {
        if (isTextElement)
        updateSelectedElement( { strikethrough: !selectedElement.strikethrough });
    };

    const toggleUppercase = () => {
        if (isTextElement)
        updateSelectedElement( {
            textTransform: selectedElement.textTransform === 'uppercase' ? 'none' : 'uppercase'
        });

    };
    const changeAlignment = (newAlignment: 'left' | 'center' | 'right' | 'justify') => {
        if (isTextElement)
        updateSelectedElement( { alignment: newAlignment });
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
        <div className={`${styles.textEditWrapper} ${isTextElement ? styles.selected : ''}`}>
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
            <div className={styles.textButtons}>
                <CustomButton onClick={toggleBold} style={{backgroundColor: bold ? 'lightblue' : 'transparent',}}>
                    <MdFormatBold size={17} />
                </CustomButton>
                <CustomButton onClick={toggleItalic} style={{backgroundColor: italic ? 'lightblue' : 'transparent',}}>
                    <MdFormatItalic size={17} />
                </CustomButton>
                <CustomButton onClick={toggleUnderline} style={{backgroundColor: underline ? 'lightblue' : 'transparent',}}>
                    <MdFormatUnderlined size={17} />
                </CustomButton>
                <CustomButton onClick={toggleStrikethrough} style={{backgroundColor: strikethrough ? 'lightblue' : 'transparent',}}>
                    <MdStrikethroughS size={17} />
                </CustomButton>
                <CustomButton onClick={toggleUppercase} style={{backgroundColor: textTransform === 'uppercase' ? 'lightblue' : 'transparent',}}>
                    <MdFormatSize size={17} />
                </CustomButton>
            </div>
            <div className={styles.textButtons}>
                <CustomButton onClick={() => changeAlignment('left')} style={{backgroundColor: alignment === 'left' ? 'lightblue' : 'transparent',}}>
                    <MdFormatAlignLeft size={17} />
                </CustomButton>
                <CustomButton onClick={() => changeAlignment('center')} style={{backgroundColor: alignment === 'center' ? 'lightblue' : 'transparent',}}>
                    <MdFormatAlignCenter size={17} />
                </CustomButton>
                <CustomButton onClick={() => changeAlignment('right')} style={{backgroundColor: alignment === 'right' ? 'lightblue' : 'transparent',}}>
                    <MdFormatAlignRight size={17} />
                </CustomButton>
                <CustomButton onClick={() => changeAlignment('justify')} style={{backgroundColor: alignment === 'justify' ? 'lightblue' : 'transparent',}}>
                    <MdFormatAlignJustify size={17} />
                </CustomButton>
            </div>
        </div>
    );
};

export default TextEditPanel;