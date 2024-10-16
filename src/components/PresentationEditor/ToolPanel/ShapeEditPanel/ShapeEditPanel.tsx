import {AppDispatch, appState} from "../../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateElement} from "../../../../store/actions.ts";
import styles from './ShapeEditPanel.module.css'

const ShapeEditPanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const presentations = useSelector((state: appState) => state.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const isShapeElement = selectedElement && ['rectangle', 'circle', 'line'].includes(selectedElement.type);
    if (!selectedElement) return <div>Выберите фигуру для редактирования.</div>;

    const updateLineWidth = (value: number) => {
        if (isShapeElement)
        dispatch(updateElement(selectedElement.id, { lineWidth: value }));
    };

    const updateBorderRadius = (value: number) => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { borderRadius: value }));
    };

    const updateColor = (value: string) => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { color: value }));
    };

    const updateOpacity = (value: number) => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { opacity: value }));
    };

    const updateBorderColor = (value: string) => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { borderColor: value }));
    };

    const updateBorderWidth = (value: number) => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { borderWidth: value }));
    };

    const updateBorderStyle = (value: 'solid' | 'dashed' | 'dotted') => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { borderStyle: value }));
    };

    const updateFillType = (value: 'solid' | 'gradient') => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { fillType: value }));
    };

    const updateGradient = (value: string) => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { gradient: value }));
    };

    return (
        <div className={styles.shapeEditWrapper}>
            <p>Редактировать фигуру</p>
            {selectedElement.type === 'line' && (
                <div>
                    <label>
                        Ширина линии:
                        <input
                            type="number"
                            value={selectedElement.lineWidth}
                            onChange={(e) => updateLineWidth(parseFloat(e.target.value))}
                        />
                    </label>
                </div>
            )}
            {(selectedElement.type === 'rectangle' || selectedElement.type === 'circle') && (
                <div>
                    <label>
                        Радиус границы:
                        <input
                            type="number"
                            value={selectedElement.borderRadius}
                            onChange={(e) => updateBorderRadius(parseFloat(e.target.value))}
                        />
                    </label>
                </div>
            )}
            {(selectedElement.type === 'rectangle' || selectedElement.type === 'circle' || selectedElement.type === 'line') && (
                <div>
                    <div>
                        <label>
                            Цвет:
                            <input
                                type="color"
                                value={selectedElement.color}
                                onChange={(e) => updateColor(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Непрозрачность:
                            <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                value={selectedElement.opacity}
                                onChange={(e) => updateOpacity(parseFloat(e.target.value))}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Цвет границы:
                            <input
                                type="color"
                                value={selectedElement.borderColor}
                                onChange={(e) => updateBorderColor(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Ширина границы:
                            <input
                                type="number"
                                value={selectedElement.borderWidth}
                                onChange={(e) => updateBorderWidth(parseFloat(e.target.value))}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Стиль границы:
                            <select
                                value={selectedElement.borderStyle}
                                onChange={(e) => updateBorderStyle(e.target.value as 'solid' | 'dashed' | 'dotted')}
                            >
                                <option value="solid">Сплошная</option>
                                <option value="dashed">Пунктирная</option>
                                <option value="dotted">Точечная</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Тип заливки:
                            <select
                                value={selectedElement.fillType}
                                onChange={(e) => updateFillType(e.target.value as 'solid' | 'gradient')}
                            >
                                <option value="solid">Сплошная</option>
                                <option value="gradient">Градиент</option>
                            </select>
                        </label>
                    </div>
                    {selectedElement.fillType === 'gradient' && (
                        <div>
                            <label>
                                Градиент:
                                <input
                                    type="text"
                                    value={selectedElement.gradient}
                                    onChange={(e) => updateGradient(e.target.value)}
                                />
                            </label>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default ShapeEditPanel;