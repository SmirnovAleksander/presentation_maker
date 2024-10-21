import styles from './PresentationsListV2.module.css'
import PresentationItem from "./PresentationItem/PresentationItem.tsx";
import useEditorStore from "../../../store/store.ts";
import {useState} from "react";
import CustomButton from "../../UI/CustomButton/CustomButton.tsx";

const PresentationsListV2 = () => {
    const presentations = useEditorStore((state) => state.presentations);
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

export default PresentationsListV2;