import {useSelector} from "react-redux";
import {appState} from "../../../store/store.ts";
import styles from './PresentationsList.module.css'
import PresentationItem from "./PresentationItem/PresentationItem.tsx";
import {useState} from "react";
import CustomButton from "../../UI/CustomButton/CustomButton.tsx";

const PresentationsList = () => {
    const presentations = useSelector((state: appState) => state.present.presentations);
    const [searchTitle, setSearchTitle] = useState("");
    const filteredPresentations = presentations.filter((p) => p.title.toLowerCase().includes(searchTitle.toLowerCase()));
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
                        <div className={styles.presentationsSearch}>
                            <p className={styles.presentationListTitle}>Недавние презентации:</p>
                            <input
                                type="text"
                                placeholder="Поиск по названию..."
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                style={{width: '400px', fontSize: '18px'}}
                            />
                            <CustomButton onClick={() => setSearchTitle('')}>
                                Сбросить
                            </CustomButton>
                        </div>
                        <div className={styles.presentationList}>
                            {filteredPresentations.map(presentation => (
                                <PresentationItem key={presentation.id} presentation={presentation}/>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default PresentationsList;