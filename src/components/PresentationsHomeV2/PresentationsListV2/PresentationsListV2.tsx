import {useSelector} from "react-redux";
import {appState} from "../../../store/store.ts";
import styles from './PresentationsListV2.module.css'
import PresentationItem from "./PresentationItem/PresentationItem.tsx";

const PresentationsListV2 = () => {
    const presentations = useSelector((state: appState) => state.presentations);


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
                                <PresentationItem key={presentation.id} presentation={presentation} />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default PresentationsListV2;