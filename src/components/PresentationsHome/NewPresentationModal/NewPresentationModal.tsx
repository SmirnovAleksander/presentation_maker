import {addPresentation} from "../../../store/actions.ts";
import {AppDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './NewPresentationModal.module.css'

const NewPresentationModal = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const createNewPresentation  = () => {
        const newPresentation = {
            id: Date.now(), // Генерация ID
            title: 'Новая презентация',
            slides: [],
        };
        dispatch(addPresentation(newPresentation));
        navigate(`/presentation/${newPresentation.id}`);
    };
    return (
        <div className={styles.createPresentationSection}>
            <p className={styles.presentationTitle}>Create new presentation</p>
            <div className={styles.presentationCard} onClick={createNewPresentation}>
                <div className={styles.plusIcon}>+</div>
            </div>
            <p className={styles.cardTitle}>Пустая презентация</p>
        </div>
    );
};

export default NewPresentationModal;