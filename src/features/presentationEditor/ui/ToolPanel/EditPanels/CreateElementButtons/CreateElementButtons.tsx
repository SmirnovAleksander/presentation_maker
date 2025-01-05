import styles from './CreateElementButtons.module.css'
import {CustomButton} from "@/shared/ui";
import useStoreSelector from '@/shared/hooks/useStoreSelector';
import { useCreateElements } from '@/shared/hooks/useCreateElements';
const CreateElementButtons = () => {
    const { selectedSlideId } = useStoreSelector();
    const {createTextElement, createShapeElement} = useCreateElements();
    return (
        <div className={styles.elementButtonsWrapper}>
            <CustomButton onClick={() => createTextElement('Новый текст')} disabled={!selectedSlideId}>Text</CustomButton>
            <CustomButton onClick={() => createShapeElement('rectangle')} disabled={!selectedSlideId}>Rectangle</CustomButton>
            <CustomButton onClick={() => createShapeElement('circle')} disabled={!selectedSlideId}>Circle</CustomButton>
            <CustomButton onClick={() => createShapeElement('line')} disabled={!selectedSlideId}>Line</CustomButton>
        </div>
    );
};

export default CreateElementButtons;