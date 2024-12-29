import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import styles from './PresentationEditorHeader.module.css'
import {useNavigate} from "react-router-dom";
import {AppDispatch, appState} from "@/app/store/store.ts";
import {updatePresentationTitle} from "@/app/store/actions.ts";
import PresentationIcon from '@/assets/PresentationsLogo.svg'
import editIcon from '@/assets/Edit.svg'


const PresentationEditorHeader = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentationId = useSelector((state: appState) => state.present.selectedPresentationId);
    const selectedPresentation  = useSelector((state: appState) =>
        state.present.presentations.find(p => p.id === selectedPresentationId)
    );
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(true);
    const [newTitle, setNewTitle] = useState(selectedPresentation?.title || '');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (selectedPresentation?.title !== '') {
            setNewTitle(selectedPresentation!.title);
            setIsEditing(false);
            setIsError(false);
        }
    }, [selectedPresentation])

    useEffect(() => {
        if (newTitle.trim() === '') {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }, [newTitle]);

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };
    const handleKeyDown  = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && selectedPresentation) {
            if (newTitle.trim() === '') {
                return;
            }
            dispatch(updatePresentationTitle(selectedPresentation.id, newTitle));
            setIsEditing(false);
        }
    };
    const handleBlur = () => {
        if (selectedPresentation && newTitle.trim() !== '') {
            dispatch(updatePresentationTitle(selectedPresentation.id, newTitle));
            setIsEditing(false)
        }
    };
    if (!selectedPresentation) {
        return <div className={styles.header}>Презентация не найдена</div>;
    }
    const navigateToPresentationHome = () => {
        if (selectedPresentation!.title !== '') {
            navigate('/')
        }
    }

    return (
        <div className={styles.header}>
            <img src={PresentationIcon} alt="Presentation" width={35} height={35} onClick={navigateToPresentationHome} style={{cursor: 'pointer'}}/>
            {isEditing
                ? (
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '7px'}}>
                        <input
                            style={{width: '250px', borderColor: isError ? 'red' : '', boxShadow: isError ? '0 0 5px rgba(241, 157, 149, 0.5)' : 'none'}}
                            type="text"
                            value={newTitle}
                            onChange={handleChangeTitle}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            className={styles.presentationTitleInput}
                            autoFocus
                        />
                        {isError && (
                            <div style={{padding: '2px 4px', backgroundColor: 'rgba(241, 157, 149, 0.9)', borderRadius: '5px'}}>Title is required</div>
                        )}
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