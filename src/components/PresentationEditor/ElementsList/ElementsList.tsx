import {AppDispatch, appState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {deleteElement, selectElement} from "../../../store/actions.ts";
import styles from './ElementsList.module.css'

const ElementsList = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedSlideId = useSelector((state: appState) => state.present.selectedSlideId);
    const selectedPresentation = useSelector((state: appState) =>
        state.present.presentations.find(p => p.id === selectedPresentationId)
    );
    const selectedElementId = useSelector((state: appState) => state.present.selectedElementId);
    const selectedSlide = selectedPresentation?.slides.find(slide => slide.id === selectedSlideId);
    const handleSelectElement = (id: number) => {
        dispatch(selectElement(id));
    };
    const handleDeleteElement = (id: number) => {
        dispatch(deleteElement(id));
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