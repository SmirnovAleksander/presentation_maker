import {useState} from "react";
import styles from './PresentationEditorHeader.module.css'
import PresentationIcon from "../../../assets/PresentationsLogo.svg";
import editIcon from "../../../assets/Edit.svg";
import useEditorStore from "../../../store/store.ts";
const PresentationEditorHeader = () => {
    const {selectedPresentationId, presentations, updatePresentationTitle} = useEditorStore();
    const selectedPresentation = presentations.find(p => p.id === selectedPresentationId);

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(selectedPresentation?.title || '');

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };
    const handleKeyDown  = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && selectedPresentation) {
            updatePresentationTitle(selectedPresentation.id, newTitle);
            setIsEditing(false);
        }
    };
    const handleBlur = () => {
        if (selectedPresentation) {
            updatePresentationTitle(selectedPresentation.id, newTitle);
        }
        setIsEditing(false);
    };
    if (!selectedPresentation) {
        return <div className={styles.header}>Презентация не найдена</div>;
    }

    return (
        <div className={styles.header}>
            <img src={PresentationIcon} alt="Presentation" width={35} height={35}/>
            {isEditing
                ? (
                    <div>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={handleChangeTitle}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            className={styles.presentationTitleInput}
                            autoFocus
                        />
                    </div>
                )
                : (
                    <h3 className={styles.cardTitle}>
                        {selectedPresentation.title}
                    </h3>)
            }
            {isEditing
                ? <div></div>
                : <div
                    className={styles.editIconContainer}
                    onClick={handleEditClick}
                >
                    <img
                        src={editIcon}
                        alt="Edit"
                        width={20}
                        height={20}
                        className={styles.editIcon}
                    />
                </div>
            }
        </div>
    );
};

export default PresentationEditorHeader;