import {useNavigate} from "react-router-dom";
import styles from './NewPresentationModalV2.module.css'
import plusIcon from '../../../assets/Plus.svg'
import useEditorStore from "../../../store/store.ts";

const NewPresentationModalV2 = () => {
    const {addPresentation} = useEditorStore();
    const navigate = useNavigate();
    const createNewPresentation  = () => {
        const newPresentation = {
            id: Date.now(),
            title: '',
            slides: [],
        };
        addPresentation(newPresentation);
        navigate(`/presentation/${newPresentation.id}`);
    };
    return (
        <div className={styles.createPresentationSection}>
            <p className={styles.presentationTitle}>Создать презентацию</p>
            <div className={styles.presentationCard} onClick={createNewPresentation}>
                <img src={plusIcon} alt="+" width={50} height={50}/>
                <p className={styles.cardTitle}>Пустая презентация</p>
            </div>
        </div>
    );
};

export default NewPresentationModalV2;