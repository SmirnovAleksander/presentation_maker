import styles from './DeleteButton.module.css'
import { MdDelete } from "react-icons/md";

interface DeleteButtonProps {
    handleDeleteElement: (id: number) => void;
    elementId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ handleDeleteElement, elementId }) => {
    return (
        <div
            className={styles.deleteIconContainer}
            onClick={() => handleDeleteElement(elementId)}
        >
            <MdDelete size={20} className={styles.deleteIcon}/>
        </div>
    );
};

export default DeleteButton;