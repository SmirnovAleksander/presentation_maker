import styles from './ToolPanel.module.css'
import {Slide} from "../../../store/types.ts";
import {addSlide, selectSlide} from "../../../store/actions.ts";
import {AppDispatch, appState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const ToolPanel = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.selectedPresentationId);
    const selectedPresentation  = useSelector((state: appState) =>
        state.presentations.find(p => p.id === selectedPresentationId)
    );
    const addNewSlide = () => {
        const newSlide: Slide = {
            id: Date.now(),
            elements: [],
            backgroundColor: '#ffffff',
        };
        if (selectedPresentation) {
            dispatch(addSlide(selectedPresentation.id, newSlide));
            dispatch(selectSlide(selectedPresentation.id, newSlide.id))
        }
    };
    return (
        <div className={styles.toolPanelWrapper}>
            <Link to={'/'}>
                <button className="back-button">Вернуться к презентациям</button>
            </Link>
            <button onClick={addNewSlide}>Добавить слайд</button>
        </div>
    );
};

export default ToolPanel;