import PresentationIcon from '@/assets/PresentationsLogo.svg'
import styles from "./PresentationsHome.module.css"
import NewPresentationModal from "@/features/presentationHome/ui/NewPresentationModal/NewPresentationModal.tsx";
import CustomButton from "@/shared/ui/CustomButton/CustomButton.tsx";
import PresentationsList from "@/features/presentationHome/ui/PresentationsList/PresentationsList.tsx";

const PresentationsHome = () => {
    const handleReset = () => {
        localStorage.clear();
        window.location.reload();
    };
    return (
        <div className={styles.presentationsHome}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={PresentationIcon} alt="Presentation" width={40} height={40}/>
                    <h2>Presentation maker</h2>
                </div>
            </div>
            <NewPresentationModal/>
            <CustomButton onClick={() => handleReset()} style={{position: 'absolute', left: '10px', bottom: '10px'}}>Reset store</CustomButton>
            <PresentationsList/>
        </div>
    );
};

export default PresentationsHome;
