import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../../../store/store.ts";
import styles from './PresentationsListV2.module.css'
import {deletePresentation} from "../../../store/actions.ts";
import deleteIcon from "../../../assets/delete.svg"

const PresentationsListV2 = () => {
    const presentations = useSelector((state: appState) => state.presentations);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleDeletePresentation = (id: number) => {
        dispatch(deletePresentation(id));
    };

    return (
        <div className={styles.presentationContainer}>
            {presentations.length === 0
                ? (
                    <div className={styles.errorMasage}>
                        Созданные презентации появятся здесь
                    </div>
                )
                : (
                    <div className={styles.presentationListWrapper}>
                        <p className={styles.presentationListTitle}>Недавние презентации</p>
                        <div className={styles.presentationList}>
                            {presentations.map(presentation => (
                                <div key={presentation.id} className={styles.presentationCardWrapper}>
                                    <div
                                        className={styles.presentationCard}
                                        onClick={() => navigate(`/presentation/${presentation.id}`)}
                                    ></div>
                                    <h3 className={styles.cardTitle}>{presentation.title}</h3>
                                    <div
                                        className={styles.deleteIconContainer}
                                        onClick={() => handleDeletePresentation(presentation.id)}
                                    >
                                        <img
                                            src={deleteIcon}
                                            alt="X"
                                            className={styles.deleteIcon}
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default PresentationsListV2;