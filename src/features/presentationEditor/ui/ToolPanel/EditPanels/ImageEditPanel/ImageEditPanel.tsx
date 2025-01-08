import styles from './ImageEditPanel.module.css'
import useStoreSelector from "@/shared/hooks/useStoreSelector.ts";

const ImageEditPanel = () => {
    const { selectedElement, updateSelectedElement } = useStoreSelector();

    const isImageElement = selectedElement && selectedElement.type === 'image'

    const updateBorderStyle = (style: 'solid' | 'dashed' | 'dotted') => {
        if (isImageElement)
            updateSelectedElement({ borderStyle: style });
    };
    const updateBorderWidth = (width: number) => {
        if (isImageElement)
            updateSelectedElement({ borderWidth: width });
    };
    const updateBorderRadius = (radius: number) => {
        if (isImageElement)
            updateSelectedElement({ borderRadius: radius });
    };
    // const updateBoxShadow = (shadow: string) => {
    //     if (isImageElement)
    //         dispatch(updateElement(selectedElement.id, { boxShadow: shadow }));
    // };
    const updateOpacity = (opacity: number) => {
        if (isImageElement)
            updateSelectedElement({ opacity });
    };
    return (
        <>
            {isImageElement && (
                <div className={styles.imageEditWrapper}>
                    {/*<p className={styles.imageEditTitle}>Параметры картинки</p>*/}
                    <div className={styles.imageEditContainer}>
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
                                step={2}
                                value={selectedElement.borderWidth}
                                onChange={(e) => updateBorderWidth(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className={styles.itemBlocWrapper}>
                            <div className={styles.itemEditWrapper} style={{gap: '3px'}}>
                                Радиус закругления:
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
                                step={5}
                                value={selectedElement.borderRadius}
                                onChange={(e) => updateBorderRadius(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className={styles.itemBlocWrapper} style={{gap: '3px'}}>
                            <label>Стиль границы:</label>
                            <select
                                value={selectedElement!.borderStyle}
                                onChange={(e) => updateBorderStyle(e.target.value as 'solid' | 'dashed' | 'dotted')}
                            >
                                <option value="solid">Сплошная</option>
                                <option value="dashed">Пунктир</option>
                                <option value="dotted">Точечная</option>
                            </select>
                        </div>
                        {/*<div className={styles.itemBlocWrapper} style={{gap: '3px'}}>*/}
                        {/*    <label>Тень:</label>*/}
                        {/*    <input*/}
                        {/*        style={{width: '200px'}}*/}
                        {/*        type="text"*/}
                        {/*        value={selectedElement!.boxShadow}*/}
                        {/*        onChange={(e) => updateBoxShadow(e.target.value)}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className={styles.itemBlocWrapper}>
                            <label>Прозрачность:</label>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.1}
                                value={selectedElement!.opacity}
                                onChange={(e) => updateOpacity(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageEditPanel;