import {useNavigate} from "react-router-dom";
import styles from './PresentationItem.module.css'
import deleteIcon from '../../../../assets/delete.svg'
import {Presentation} from "../../../../store/types.ts";
import React, {useState} from "react";
import RenderSlideItemElements from "../../../PresentationEditor/SlidesList/RenderSlideItemElements.tsx";
import useEditorStore from "../../../../store/store.ts";

interface PresentationItemProps {
    presentation: Presentation;
}

const PresentationItem: React.FC<PresentationItemProps> = ({presentation}) => {
    const navigate = useNavigate();
    const { deletePresentation, selectPresentation, selectSlide, updatePresentationTitle } = useEditorStore();
    const firstSlide = presentation.slides[0];

    const handleDeletePresentation = (id: number) => {
        deletePresentation(id);
    };

    const [editingId, setEditingId] = useState<number | null>(null);
    const [newTitle, setNewTitle] = useState<string>('');

    const handleDoubleClick = (presentationId: number, currentTitle: string) => {
        setEditingId(presentationId);
        setNewTitle(currentTitle);
    };
    const handleChangeTitle = (presentationId: number) => {
        if (newTitle.trim() !== '') {
            updatePresentationTitle(presentationId, newTitle);
            setEditingId(null);
            setNewTitle('');
        }
    };
    const navigateToEditPresentation = () => {
        selectPresentation(presentation.id);
        navigate(`/presentation/${presentation.id}`);
        if (firstSlide) {
           selectSlide(firstSlide.id);
        }
    }
    const slideStyle = firstSlide ? {
        backgroundColor: firstSlide.backgroundImage
            ? 'transparent'
            : firstSlide.backgroundColor || '#ffffff',
        backgroundImage: firstSlide.backgroundImage
            ? `url(${firstSlide.backgroundImage})`
            : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {};
    return (
        <div key={presentation.id} className={styles.presentationCardWrapper}>
            <div
                className={styles.presentationCard}
                onClick={navigateToEditPresentation}
                style={slideStyle}
            >
                <div>
                    {firstSlide
                        ? <RenderSlideItemElements slide={firstSlide} multiplier={5}/>
                        : <div>Пустая презентация</div>
                    }
                </div>
                {firstSlide && <div className={styles.editText}>Редактировать</div>}
            </div>
            <div className={styles.presentationUnder}>
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