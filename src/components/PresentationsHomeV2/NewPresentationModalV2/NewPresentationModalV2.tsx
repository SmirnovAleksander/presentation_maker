import {addPresentation, selectPresentation} from "../../../store/actions.ts";
import {AppDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './NewPresentationModalV2.module.css'
import plusIcon from '../../../assets/Plus.svg'

const NewPresentationModalV2 = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const createNewPresentation  = () => {
        const newPresentation = {
            id: Date.now(),
            title: '',
            slides: [],
        };
        dispatch(addPresentation(newPresentation));
        dispatch(selectPresentation(newPresentation.id));
        navigate(`/presentation/${newPresentation.id}`);
    };
    return (
        <div className={styles.createPresentationSection}>
            <p className={styles.presentationTitle}>Создать презентацию</p>
            <div className={styles.presentationCard} onClick={createNewPresentation}>
                {/*<div className={styles.plusIcon}>+</div>*/}
                <img src={plusIcon} alt="+" width={50} height={50}/>
                <p className={styles.cardTitle}>Пустая презентация</p>
            </div>
        </div>
    );
};

export default NewPresentationModalV2;