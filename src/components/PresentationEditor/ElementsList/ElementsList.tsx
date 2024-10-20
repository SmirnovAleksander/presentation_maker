import styles from './ElementsList.module.css'
import useEditorStore from "../../../store/store.ts";

const ElementsList = () => {
    const {selectedPresentationId,
        selectedSlideId,
        selectedElementId,
        presentations,
        selectElement,
        deleteElement,
    } = useEditorStore();
    const selectedPresentation = presentations.find(p => p.id === selectedPresentationId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);

    const handleSelectElement = (id: number) => {
        selectElement(id);
    };
    const handleDeleteElement = (id: number) => {
        deleteElement(id);
    };
    return (
        <div className={styles.ElementsList}>
            <h3 className={styles.ElementsListTitle}>Список элементов</h3>
            <div className={styles.line}></div>
            <div className={styles.elementsCardWrapper}>
                {selectedSlide && selectedSlide.elements.length > 0
                    ? selectedSlide.elements.map(el => (
                        <div
                            key={el.id}
                            onClick={() => handleSelectElement(el.id)}
                            className={`${styles.elementsCard} ${el.id === selectedElementId && styles.elementsCardSelected}`}
                        >
                            <p className={styles.elementTitle}>{el.type}</p>
                            <button onClick={() => handleDeleteElement(el.id)}>
                                Удалить
                            </button>
                        </div>
                    )) : (
                        <div className={styles.noElementsMessage}>
                            Элементов нет
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ElementsList;