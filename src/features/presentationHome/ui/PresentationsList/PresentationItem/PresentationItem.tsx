import {useNavigate} from "react-router-dom";
import styles from './PresentationItem.module.css'
import React, {useState} from "react";
import RenderSlideItemElements from "@/features/presentationEditor/ui/SlidesList/RenderSlideItemElements.tsx";
import {Presentation} from "@/shared/types/types.ts";
import {CustomInput, DeleteButton} from "@/shared/ui";
import useStoreSelector from "@/shared/hooks/useStoreSelector";

interface PresentationItemProps {
    presentation: Presentation;
}

const PresentationItem: React.FC<PresentationItemProps> = ({presentation}) => {
    const navigate = useNavigate();
    const firstSlide = presentation.slides[0];
    const {deletePresentationAction,
        updatePresentationTitleAction,
        selectSlideAction,
        selectPresentationAction
    } = useStoreSelector();
    
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleDeletePresentation = (id: number) => {
        setIsDeleting(true);
        setTimeout(() => {
            deletePresentationAction(id);
        }, 300);
    };

    const [editingId, setEditingId] = useState<number | null>(null);
    const [newTitle, setNewTitle] = useState<string>('');

    const handleDoubleClick = (presentationId: number, currentTitle: string) => {
        setEditingId(presentationId);
        setNewTitle(currentTitle);
    };
    const handleChangeTitle = () => {
        if (newTitle.trim() !== '') {
            updatePresentationTitleAction(newTitle);
            setEditingId(null);
            setNewTitle('');
        }
    };
    const navigateToEditPresentation = () => {
        selectPresentationAction(presentation.id);
        navigate(`/presentation/${presentation.id}`);
        if (firstSlide) {
            selectSlideAction(firstSlide.id);
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleChangeTitle();
        }
    };

    return (
        <div key={presentation.id} className={styles.presentationCardWrapper} style={{transform: `${isDeleting ? 'scale(0)' : 'scale(1)'}`}}>
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
                    <CustomInput
                        value={newTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
                        onBlur={() => handleChangeTitle}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <h3
                        className={styles.cardTitle}
                        onDoubleClick={() => handleDoubleClick(presentation.id, presentation.title)}
                    >
                        {presentation.title}
                    </h3>
                )}
                <DeleteButton
                    handleDeleteElement={handleDeletePresentation}
                    elementId={presentation.id}
                />
            </div>
        </div>
    );
};

export default PresentationItem;