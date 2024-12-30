import styles from './DeleteButton.module.css'
import deleteIcon from "@/assets/delete.svg";

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
            <img
                src={deleteIcon}
                alt="X"
                className={styles.deleteIcon}
                width={20}
                height={20}
            />
        </div>
    );
};

export default DeleteButton;