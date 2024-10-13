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
    return (
        <div className={styles.textEditWrapper}>
            <p>Параметры текстового элемента</p>
            {selectedElement && selectedElement.type === 'text'
                ? (
                    <div>
                        <div>
                            <label>Id: </label>
                            {selectedElement && selectedElement.id}
                        </div>
                        <div>
                            <label>Размер шрифта:</label>
                            <input
                                type="number"
                                value={selectedElement.fontSize || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (newValue === '') {
                                        return;
                                    }
                                    updateFontSize(Number(newValue))
                                }}
                            />
                        </div>
                        <div>
                            <label>Шрифт:</label>
                            <select
                                value={selectedElement.fontFamily}
                                onChange={(e) => {
                                    updateFontFamily(e.target.value)
                                }}
                            >
                                {availableFonts.map(font => (
                                    <option key={font} value={font}>{font}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ) : (
                    <div>
                        Выбери текстовый элемент
                    </div>
                )}
        </div>
    );
};

export default TextEditPanel;