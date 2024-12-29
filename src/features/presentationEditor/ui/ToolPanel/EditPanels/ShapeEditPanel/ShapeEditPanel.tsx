import {AppDispatch, appState} from "../../../../../../app/store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {updateElement} from "../../../../../../app/store/actions.ts";
import styles from './ShapeEditPanel.module.css'

const ShapeEditPanel = () => {
    const dispatch: AppDispatch = useDispatch();

    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);

    const presentations = useSelector((state: appState) => state.present.presentations);
    const selectedPresentation = presentations.find(presentation => presentation.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const selectedElement = selectedSlide?.elements.find(el => el.id === selectedElementId);

    const isShapeElement = selectedElement && ['rectangle', 'circle', 'line'].includes(selectedElement.type);

    const updateLineWidth = (value: number) => {
        if (isShapeElement)
        dispatch(updateElement(selectedElement.id, { lineWidth: value }));
    };
    const updateBorderRadius = (value: number) => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { borderRadius: value }));
    };
    const updateOpacity = (value: number) => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { opacity: value }));
    };
    const updateBorderWidth = (value: number) => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { borderWidth: value }));
    };
    const updateBorderStyle = (value: 'solid' | 'dashed' | 'dotted') => {
        if (isShapeElement)
            dispatch(updateElement(selectedElement.id, { borderStyle: value }));
    };
    // const updateFillType = (value: 'solid' | 'gradient') => {
    //     if (isShapeElement)
    //         dispatch(updateElement(selectedElement.id, { fillType: value }));
    // };
    // const updateGradient = (value: string) => {
    //     if (isShapeElement)
    //         dispatch(updateElement(selectedElement.id, { gradient: value }));
    // };
    return (
        <>
            {isShapeElement && (
                <div className={styles.shapeEditWrapper}>
                    {/*<p className={styles.shapeEditTitle}>Редактировать фигуру</p>*/}
                    <div className={styles.editItemsContainer}>
                        {(selectedElement.type === 'rectangle' || selectedElement.type === 'circle') && (
                            <div className={styles.itemBlocWrapper}>
                                <div className={styles.itemEditWrapper}>
                                    Ширина границы:
                                    <input
                                        style={{width: '50px'}}
                                        type="number"
                                        value={selectedElement.borderWidth}
                                        onChange={(e) => updateBorderWidth(parseFloat(e.target.value))}
                                    />
                                </div>
                                <input
                                    style={{width: '170px'}}
                                    type="range"
                                    min={0}
                                    max={20}
                                    value={selectedElement.borderWidth}
                                    onChange={(e) => updateBorderWidth(parseFloat(e.target.value))}
                                />
                            </div>
                        )}
                        {(selectedElement.type === 'rectangle' || selectedElement.type === 'circle' || selectedElement.type === 'line') && (
                            <>
                                <div className={styles.itemBlocWrapper}>
                                    <div className={styles.itemEditWrapper}>
                                        Непрозрачность:
                                        <input
                                            style={{width: '50px'}}
                                            type="number"
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            value={selectedElement.opacity}
                                            onChange={(e) => updateOpacity(parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <input
                                        style={{width: '170px'}}
                                        type="range"
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        value={selectedElement.opacity}
                                        onChange={(e) => updateOpacity(parseFloat(e.target.value))}
                                    />
                                </div>
                                <div className={styles.itemBlocWrapper} style={{gap: '3px'}}>
                                    Стиль границы:
                                    <select
                                        style={{width: '150px'}}
                                        value={selectedElement.borderStyle}
                                        onChange={(e) => updateBorderStyle(e.target.value as 'solid' | 'dashed' | 'dotted')}
                                    >
                                        <option value="solid">Сплошная</option>
                                        <option value="dashed">Пунктирная</option>
                                        <option value="dotted">Точечная</option>
                                    </select>
                                </div>
                                {/*<div className={styles.itemBlocWrapper} style={{gap: '3px'}}>*/}
                                {/*    Тип заливки:*/}
                                {/*    <select*/}
                                {/*        style={{width: '150px'}}*/}
                                {/*        value={selectedElement.fillType}*/}
                                {/*        onChange={(e) => updateFillType(e.target.value as 'solid' | 'gradient')}*/}
                                {/*    >*/}
                                {/*        <option value="solid">Сплошная</option>*/}
                                {/*        <option value="gradient">Градиент</option>*/}
                                {/*    </select>*/}
                                {/*</div>*/}
                                {/*{selectedElement.fillType === 'gradient' && (*/}
                                {/*    <div className={styles.itemBlocWrapper}>*/}
                                {/*        Градиент:*/}
                                {/*        <input*/}
                                {/*            style={{width: '170px'}}*/}
                                {/*            type="text"*/}
                                {/*            value={selectedElement.gradient}*/}
                                {/*            onChange={(e) => updateGradient(e.target.value)}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </>
                        )}
                        {selectedElement.type === 'line' && (
                            <div className={styles.itemBlocWrapper}>
                                <div className={styles.itemEditWrapper}>
                                    Ширина линии:
                                    <input
                                        style={{width: '50px'}}
                                        type="number"
                                        value={selectedElement.lineWidth}
                                        onChange={(e) => updateLineWidth(parseFloat(e.target.value))}
                                    />
                                </div>
                                <input
                                    style={{width: '170px'}}
                                    type="range"
                                    min={0}
                                    max={20}
                                    step={1}
                                    value={selectedElement.lineWidth}
                                    onChange={(e) => updateLineWidth(parseFloat(e.target.value))}
                                />
                            </div>
                        )}
                        {(selectedElement.type === 'rectangle') && (
                            <div className={styles.itemBlocWrapper}>
                                <div className={styles.itemEditWrapper}>
                                    Радиус границы:
                                    <input
                                        style={{width: '50px'}}
                                        type="number"
                                        value={selectedElement.borderRadius}
                                        onChange={(e) => updateBorderRadius(parseFloat(e.target.value))}
                                    />
                                </div>
                                <input
                                    style={{width: '170px'}}
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={selectedElement.borderRadius}
                                    onChange={(e) => updateBorderRadius(parseFloat(e.target.value))}
                                />
                            </div>
                        )}
                    </div>

                </div>
            )}
        </>
    );
};

export default ShapeEditPanel;