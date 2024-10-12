import {deletePresentation, selectPresentation, updatePresentationTitle} from "../../../../store/actions.ts";
import {AppDispatch} from "../../../../store/store.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './PresentationItem.module.css'
import deleteIcon from '../../../../assets/delete.svg'
import {Presentation} from "../../../../store/types.ts";
import React, {useState} from "react";

interface PresentationItemProps {
    presentation: Presentation;
}

const PresentationItem: React.FC<PresentationItemProps> = ({presentation}) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const handleDeletePresentation = (id: number) => {
        dispatch(deletePresentation(id));
    };

    const [editingId, setEditingId] = useState<number | null>(null);
    const [newTitle, setNewTitle] = useState<string>('');
    const handleDoubleClick = (presentationId: number, currentTitle: string) => {
        setEditingId(presentationId);
        setNewTitle(currentTitle);
    };
    const handleChangeTitle = (presentationId: number) => {
        if (newTitle.trim() !== '') {
            dispatch(updatePresentationTitle(presentationId, newTitle));
            setEditingId(null);
            setNewTitle('');
        }
    };
    const navigateToEditPresentation = () => {
        dispatch(selectPresentation(presentation.id));
        navigate(`/presentation/${presentation.id}`);
    }

    return (
        <div key={presentation.id} className={styles.presentationCardWrapper}>
            <div
                className={styles.presentationCard}
                onClick={navigateToEditPresentation}
            ></div>
            <div className={styles.presentationUnder}>
                {/*<h3 className={styles.cardTitle}>{presentation.title}</h3>*/}
                {editingId === presentation.id ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={() => handleChangeTitle(presentation.id)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleChangeTitle(presentation.id);
                            }
                        }}
                        className={styles.cardTitleInput}
                    />
                ) : (
                    <h3
                        className={styles.cardTitle}
                        onDoubleClick={() => handleDoubleClick(presentation.id, presentation.title)}
                    >
                        {presentation.title}
                    </h3>
                )}
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
        </div>
    );
};

export default PresentationItem;