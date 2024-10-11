import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {appState} from "../../../store/store.ts";
import styles from './PresentationsList.module.css'

const PresentationsList = () => {
    const presentations = useSelector((state: appState) => state.presentations);
    const navigate = useNavigate();
    return (
        <div className={styles.presentationContainer}>
            {presentations.length === 0 && (
                <div className={styles.errorMasage}>
                    Созданные презентации появятся здесь
                </div>
            )}
            <div className={styles.presentationList}>
                {presentations.map(presentation => (
                    <div key={presentation.id}>
                        <div
                            className={styles.presentationCard}
                            onClick={() => navigate(`/presentation/${presentation.id}`)}
                        >
                        </div>
                        <h3 className={styles.cardTitle}>{presentation.title}</h3>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default PresentationsList;