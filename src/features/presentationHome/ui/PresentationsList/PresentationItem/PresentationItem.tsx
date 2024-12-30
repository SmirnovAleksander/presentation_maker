import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './PresentationItem.module.css'
import React, {useState} from "react";
import RenderSlideItemElements from "@/features/presentationEditor/ui/SlidesList/RenderSlideItemElements.tsx";
import {AppDispatch} from "@/app/store/store.ts";
import {deletePresentation, selectPresentation, selectSlide, updatePresentationTitle} from "@/app/store/actions.ts";
import {Presentation} from "@/shared/types/types.ts";
import {CustomInput, DeleteButton} from "@/shared/ui";

interface PresentationItemProps {
    presentation: Presentation;
}

const PresentationItem: React.FC<PresentationItemProps> = ({presentation}) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const firstSlide = presentation.slides[0];
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleDeletePresentation = (id: number) => {
        setIsDeleting(true);
        setTimeout(() => {
            dispatch(deletePresentation(id));
        }, 300);
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
        if (firstSlide) {
            dispatch(selectSlide(firstSlide.id));
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
                        onBlur={() => handleChangeTitle(presentation.id)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleChangeTitle(presentation.id);
                            }
                        }}
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