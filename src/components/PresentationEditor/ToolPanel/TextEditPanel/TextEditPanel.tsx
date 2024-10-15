import styles from './TextEditPanel.module.css'
import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateElement} from "../../../../store/actions.ts";

const TextEditPanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const presentations = useSelector((state: appState) => state.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const updateFontSize = (fontSize: number) => {
        dispatch(updateElement(selectedElement!.id, { fontSize }));
    };
    const updateFontFamily = (fontFamily: string) => {
        dispatch(updateElement(selectedElement!.id, { fontFamily }));
    };
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

    const isTextElement = selectedElement?.type === 'text'
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
            <div>

            </div>
        </div>
    );
};

export default TextEditPanel;